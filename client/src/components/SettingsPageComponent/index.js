import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import profileImageUpload from '../ImageUpload/profileImageUpload';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm, Field } from 'redux-form';
import { TextField, Toggle } from 'redux-form-material-ui';
import request from 'superagent';


import '../../styles/Settings.css';

export class SettingsPageComponent extends Component {

  constructor(props){
    super(props)

    this.state = {
      userInfo: null
    }

    this.logout = this.logout.bind(this);
    this.goToLoginIfLoggedOut = this.goToLoginIfLoggedOut.bind(this);
    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    this.goToLoginIfLoggedOut();

    if(this.props.user)
      request
      .get(`/api/users/${this.props.user.userId}`)
      .end((err,res) => {
        this.setState({ userInfo: res.body });
        this.props.initialize(res.body)
      })
  }

  componentDidUpdate() {
    this.goToLoginIfLoggedOut();
  }

  goToLoginIfLoggedOut() {
    if(!this.props.user) {
      browserHistory.push('/login');
    }
  }

  handler(values) {
    request
    .put('/api/profile')
    .send({
      user_avatar_url: values.user_avatar_url,
      user_name: values.user_name,
      anonymous: values.anonymous,
    })
    .end((err,res) => {
      browserHistory.push('/profile');
      this.props.passSnackbarMessage('Profile settings updated')
    })
  }

  logout() {
    this.props.attemptLogout();
    this.props.passSnackbarMessage('Logged out');
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { userInfo } = this.state;

    return (
    <div>
    {userInfo &&
    <form onSubmit={ handleSubmit(this.handler) }>
      <div className="row center-xs sm-xs settings-container">
        <Field name="user_avatar_url" component={profileImageUpload} userInfo={userInfo} />
      </div>

      <div className="row center-xs settings-options">
        <div className="col-xs-10 col-sm-6 ">
          <h2>User Settings</h2>
          <Field name="user_name" component={TextField} floatingLabelText="Display Name" style={{width: '100%'}} />
          <Field name="anonymous" component={Toggle} label="Anonymous"/>
        </div>
      </div>

      <div className="row center-xs sm-xs">
        <div className="col-xs-10 col-sm-4 ">
        <div className="row center-xs sm-xs">

          <div className="col-xs-10 col-sm-12 ">
            <RaisedButton type="submit" className="settings-btn" label="Save settings"
              disabled={pristine || submitting} fullWidth={true} primary={true}
            />
          </div>

          <div className="col-xs-10 col-sm-12 ">

            <RaisedButton className="settings-btn" label="Log Out" fullWidth={true} onTouchTap={this.logout} />
          </div>
        </div>
      </div>
      </div>
    </form>}
    </div>
    )
  }

}

SettingsPageComponent = reduxForm({
  form: 'settingsForm',
})(SettingsPageComponent)
export default SettingsPageComponent;
