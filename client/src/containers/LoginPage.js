import {connect} from 'react-redux';

import {attemptLogin, navigatedAwayFromAuthFormPage} from '../actions/AuthActions';
import {passSnackbarMessage} from '../actions/SnackBarActions';
import {toggleBottomBarVisibility} from '../actions';

import LoginPageComponent from '../components/LoginPageComponent';

function mapStateToProps(state) {
  return {
    userAuthSession: state.userAuthSession,
    pageVisibility: state.pageVisibility,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin: token => dispatch(attemptLogin(token)),
    navigatedAwayFromAuthFormPage: () => dispatch(navigatedAwayFromAuthFormPage()),
    passSnackbarMessage: (msg) => dispatch(passSnackbarMessage(msg)),
    toggleBottomBar:(visibility) => dispatch(toggleBottomBarVisibility(visibility)),
  };
}


const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageComponent);


export default LoginPage;
