import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { browserHistory } from 'react-router'
import request from 'superagent'
import { TextField, Toggle } from 'redux-form-material-ui'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton'
import EmojiInput from './EmojiInput'
import ImageUpload from '../ImageUpload/index.js'
import validUrl from 'valid-url'
import EmojiAnnotationToUni from '../../utils/emoji-annotation-to-unicode';
import EmojiUniToAnnotation from '../../utils/emoji-unicode-to-annotation';
import * as geo from '../../utils/geolocator';

import SocketHandler, {FEEDS_SOCKET} from '../../SocketHandler';
import '../../styles/form.css';

const handler = (passSnackbarMessage, socketHandler, user, location, dropId) => values => {
  if(values.emojiUni === null){
    values.emojiUni='1f61b';
  } else {
    values.emojiUni = EmojiAnnotationToUni[values.emojiUni.substring(1,values.emojiUni.length - 1)];
  }

  if(dropId){
    // If edit/:dropId route
    values.dropId = dropId;
    values.userId = user.userId;
    request
    .put('/api/feeds')
    .send(values)
    .end((err,res) => {
      passSnackbarMessage('Updated message details');
      browserHistory.push('/profile');
    })
  } else if (navigator.geolocation) {
    passSnackbarMessage('Getting location and submitting..')
    navigator.geolocation.getCurrentPosition(position=>{
      socketHandler.post({
        userID: user.userId,
        emoji: values.emojiUni,
        title: values.title,
        video: values.videoUrl,
        image: values.imageId,
        sound: values.soundcloudUrl,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        date: moment(),
        anonymous: values.anonymous ? 1 : 0
      });
      browserHistory.push('/drops')
    });
  }

}

const validate = values => {
  const errors = {};
  const requiredFields = [ 'title' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  const urlFields = [ 'soundcloudUrl', 'videoUrl' ];
  urlFields.forEach(field => {
    const str = values[field];
    if(str && str.length > 0 && !validUrl.isUri(str)){
      errors[ field ] = 'Invalid Link'
    }
  })

  return errors;
}

const socketHandler = new SocketHandler();


class AddForm extends Component {

  constructor(props){
    super(props);
    this.clickedDrop = null;
  }

  componentDidMount() {
    socketHandler.setup(FEEDS_SOCKET, {}, this.postReceive.bind(this));

    const {drops, profileDrops, selectedDrop} = this.props;
    this.clickedDrop = selectedDrop.selectedDropSrc === "profile" ? profileDrops[selectedDrop.selectedDropIdx] : null;

    if(this.clickedDrop){
        this.clickedDrop.emojiUni = ':'+EmojiUniToAnnotation[selectedDrop.emojiUni]+':';
        console.log(this.clickedDrop)
        this.props.initialize(this.clickedDrop);
    } else{
      request
      .get('/api/feeds/'+this.props.params.dropId)
      .end((err,res) => {
        res.body.emojiUni = ':'+EmojiUniToAnnotation[res.body.emojiUni]+':';
        this.props.initialize(res.body);
      })
    }
  }

  componentDidUpdate(prevProps) {
    // Clear form if going from edit to add message route
    if(prevProps.dropId && !this.props.dropId){
      this.props.initialize({});
    }
  }

  componentWillUnmount() {
    socketHandler.uninstall();
  }

  postReceive() {

  }

  render() {
    const { handleSubmit, pristine, passSnackbarMessage, submitting, dropId, user, location } = this.props;

    return (
      <form onSubmit={ handleSubmit(handler(passSnackbarMessage, socketHandler, user, location, dropId)) }>
      <h1>{dropId ? 'Edit message' : 'New message'}</h1>

      <div className="row center-xs">
        <div className="col-xs-10">
          <Field name="emojiUni" component={EmojiInput} hintText="Choose Emoji"/>
          <Field name="title" component={TextField} fullWidth={true}
          floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
          errorStyle={{textAlign: "left"}}
          multiLine={true} rows={2}/>
          <Field name="anonymous" component={Toggle} label="Anonymous" style={{textAlign:'left'}}/>
          </div>
          <div className="col-xs-12"><h3>Other Options</h3></div>
          <div className="col-xs-10">
          <Field name="imageId" component={ImageUpload} />
          <Field name="videoUrl" component={TextField} hintText="Youtube/ Vimeo Link" fullWidth={true} errorStyle={{textAlign: "left"}} />
          <Field name="soundcloudUrl" component={TextField} hintText="Soundcloud Link" fullWidth={true} errorStyle={{textAlign: "left"}} />
        </div>

        <div className="col-xs-12">
          <RaisedButton type="submit" label="Submit"
          labelStyle={{fontSize:"1.2rem"}} style={{margin: "2vh 0 5vh", width: "50%"}}
          disabled={pristine || submitting} primary={true}
          />
        </div>
        </div>
      </form>
    )
  }
}

// Decorate with redux-form
AddForm = reduxForm({
  form: 'addForm',
  validate
})(AddForm)

AddForm.PropTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default AddForm;
