import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {browserHistory} from 'react-router';

const responseFacebook = attemptLogin => (response) => {
  console.log(response);
  attemptLogin(response.accessToken);
}

export default class LoginPageComponent extends Component {

  goToProfileIfLoggedIn(){
    if (this.props.userAuthSession.isLoggedIn){
      browserHistory.push('/profile');
    }
  }
  componentWillMount() {
    this.goToProfileIfLoggedIn();
  }
  componentDidUpdate() {
    this.goToProfileIfLoggedIn();
  }
  componentWillUnmount() {
    this.props.navigatedAwayFromAuthFormPage();
  }

  render() {
    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FB_CLIENT_ID}
        autoLoad={true}
        fields="name,email,picture"
        scope="user_friends, email, public_profile, publish_actions"
        callback={responseFacebook(this.props.attemptLogin)}
        icon="fa-facebook"
      />
    )
  }
}
