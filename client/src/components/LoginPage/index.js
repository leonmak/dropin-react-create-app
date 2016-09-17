import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import request from 'superagent';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

const LoginPage = props => (
  <div>
  <FacebookLogin
    appId={process.env.FB_CLIENT_ID}
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    icon="fa-facebook"
  />
  </div>
)

export default LoginPage;
