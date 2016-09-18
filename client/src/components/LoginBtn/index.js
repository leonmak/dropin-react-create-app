import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = attemptLogin => (response) => {
  console.log(response);
  attemptLogin(response.accessToken);
}

const LoginBtn = props => (
  <div>
  <FacebookLogin
    appId={process.env.REACT_APP_FB_CLIENT_ID}
    autoLoad={true}
    fields="name,email,picture"
    scope="user_friends, email, public_profile, publish_actions"
    callback={responseFacebook(props.attemptLogin)}
    icon="fa-facebook"
  />
  </div>
)

export default LoginBtn;
