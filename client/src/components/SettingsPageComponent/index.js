import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Avatar from 'material-ui/Avatar';
import profileImageUpload from '../ImageUpload/profileImageUpload';
import RaisedButton from 'material-ui/RaisedButton';
import { reduxForm, Field } from 'redux-form';
import { Toggle } from 'redux-form-material-ui';
import UsernameTextField from './UsernameTextField';

import '../../styles/Settings.css';

const handler = (reset) => values => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

export class SettingsPageComponent extends Component {

  constructor(props){
    super(props)

    this.logout = this.logout.bind(this);
    this.goToLoginIfLoggedOut = this.goToLoginIfLoggedOut.bind(this);
  }

  componentWillMount() {
    this.goToLoginIfLoggedOut();
  }

  componentDidUpdate() {
    this.goToLoginIfLoggedOut();
  }

  goToLoginIfLoggedOut() {
    if(!this.props.user) {
      browserHistory.push('/login');
    }
  }

  logout() {
    this.props.attemptLogout();
    this.props.passSnackbarMessage('Logged out')
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, user } = this.props;

    return (
    <form onSubmit={ handleSubmit(handler(reset)) }>
    {user &&
    <div>
      <div className="row center-xs sm-xs settings-container">
        <Field name="imageId" component={profileImageUpload} user={user}/>
      </div>

      <div className="row center-xs settings-options">
        <div className="col-xs-10 col-sm-6 ">
          <h2>User Settings</h2>
          <Field name="username" component={UsernameTextField} user={user} />
          <Field name="anonymous" component={Toggle} defaultToggled={user.anonymous} label="Anonymous"/>
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

    </div>}
    </form>
    )
  }

}

SettingsPageComponent = reduxForm({
  form: 'settingsForm',
})(SettingsPageComponent)
export default SettingsPageComponent;
