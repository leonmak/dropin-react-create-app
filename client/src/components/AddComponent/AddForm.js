import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
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

const handler = (reset, socketHandler, user, location) => values => {
  if(values.emojiUni === null){
    //values.emojiUni = 'default-marker';
    values.emojiUni='1f61b';
  } else {
    values.emojiUni = EmojiAnnotationToUni[values.emojiUni.substring(1,values.emojiUni.length - 1)];
  }
  console.log(values);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

  console.log('user', user);
  console.log('location', location);


  socketHandler.post(
    {userID: user.userId,
      emoji: values.emojiUni,
      title: values.title,
      video: values.videoUrl,
      image: values.imageId,
      sound: values.soundcloudUrl,
      longitude: location[0],
      latitude: location[1],
      date: moment()});


  reset();
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

  constructor(props) {
    super(props);
    this.geoId = null;
    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(coords) {
    this.props.setLocation([coords.longitude, coords.latitude])
  }

  componentDidMount() {
    socketHandler.setup(FEEDS_SOCKET, {}, this.postReceive.bind(this));
    // this.geoId = geo.geoListener(this.updateLocation);
    // this.props.dropId && this.props.loadFormSucess(this.props.);
    if(this.props.dropId){
      const selectedIdx = this.props.selectedDrop.selectedDropIdx;
      const selectedDrop = this.props.profileDrops[selectedIdx];
      if(selectedDrop){
        selectedDrop.emojiUni = ':'+EmojiUniToAnnotation[selectedDrop.emojiUni]+':';
        this.props.initialize(selectedDrop);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Clear form if going from edit to add message route
    if(prevProps.dropId && !this.props.dropId){
      this.props.initialize({});
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
    socketHandler.uninstall();
  }

  postReceive(){

  }

  render() {
    const { handleSubmit, pristine, reset, submitting, dropId } = this.props;

    return (
      <form onSubmit={ handleSubmit(handler(reset, socketHandler, this.props.user, this.props.location)) }>
      <h1>{dropId ? 'Edit message' : 'New message'}</h1>

      <div className="row center-xs">
        <div className="col-xs-10">
          <Field name="emojiUni" component={EmojiInput} hintText="Choose Emoji"/>
          <Field name="title" component={TextField} fullWidth={true}
          floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
          errorStyle={{textAlign: "left"}}
          multiLine={true} rows={2}/>
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
