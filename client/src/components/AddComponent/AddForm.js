import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import EmojiInput from './EmojiInput'
import ImageUpload from '../ImageUpload'
import validUrl from 'valid-url'

import SocketHandler, {FEEDS_SOCKET} from '../../SocketHandler';
import request from 'superagent';

import '../../styles/form.css';

/*const handler = reset => values =>
new Promise(resolve => {
  setTimeout(() => {
    if(values.emojiUni === null)
      values.emojiUni = 'default-marker'
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()

      // reset form after submit
      reset();
    }, 500)
})*/

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


class AddForm extends Component {

  socketHandler = new SocketHandler();

  componentDidMount() {
    this.socketHandler.setup(FEEDS_SOCKET, this.postReceive.bind(this));
  }

  postReceive(){
  }

  sendMessage(msg) {
    this.socketHandler.post(1,msg);
    console.log("HIHIHIHIHIH");
  }


  //should add geolocation state here if not you dunno where you submit a new drop
/*
<form onSubmit={ handleSubmit(handler(reset)) }>*/

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={ this.sendMessage('hello') }>
      <h1>New message</h1>

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

export default AddForm;
