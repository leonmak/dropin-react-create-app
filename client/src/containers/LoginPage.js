import {connect} from 'react-redux';

import {attemptLogin, navigatedAwayFromAuthFormPage} from '../actions/AuthActions';

import LoginPageComponent from '../components/LoginPageComponent';

function mapStateToProps(state) {
  return {
    userAuthSession: state.userAuthSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: token => dispatch(attemptLogin(token)),
    navigatedAwayFromAuthFormPage: () => dispatch(navigatedAwayFromAuthFormPage())
  };
}


const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageComponent);


export default LoginPage;
