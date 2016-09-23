import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {browserHistory, Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import * as Icons from '../../utils/Icons';

import '../../styles/SplashPage.css'
import logo from '../../../../favicons/apple-icon-120x120.png';


const responseFacebook = attemptLogin => (response) => attemptLogin(response.accessToken);

export default class LoginPageComponent extends Component {

  constructor(props){
    super(props)
    this.goToProfileIfLoggedIn = this.goToProfileIfLoggedIn.bind(this);
  }


  goToProfileIfLoggedIn(){
    if (this.props.userAuthSession.isLoggedIn){
      browserHistory.push('/profile');
      this.props.passSnackbarMessage('Logged in');
    }
  }
  componentWillMount() {
    this.goToProfileIfLoggedIn();
    this.props.toggleBottomBar(false);
  }
  componentDidUpdate() {
    this.goToProfileIfLoggedIn();
  }
  componentWillUnmount() {
    this.props.navigatedAwayFromAuthFormPage();
    this.props.toggleBottomBar(true);
  }

  render() {
    return (
      <div className="row center-xs" >
      <div className="col-xs-12" id="splash-page"
      style={{background: `linear-gradient(rgba(255, 255, 255, 0.5), rgb(255, 255, 255)), url(${process.env.REACT_APP_SPLASHPAGE_IMG_URL}) repeat`}}>
      <img src={logo} alt="Logo" />
      <p>Find out what people around you are saying!</p>
      <h2>Drop into the conversation</h2>
      <FacebookLogin
      appId={process.env.REACT_APP_FB_CLIENT_ID}
      autoLoad={true}
      fields="name,email,picture"
      scope="user_friends, email, public_profile, publish_actions"
      callback={responseFacebook(this.props.attemptLogin)}
      icon="fa-facebook"
      />
      <div>
        <Link id="home-button" to="/">
        <IconButton tooltip="Go home" touch={true} iconStyle={{color: '#808080'}}>
        {Icons.MUI('home')}
        </IconButton>
        </Link>
        </div>
        </div>
        </div>
        )
    }
  }
