import {connect} from 'react-redux';

import {attemptLogin} from '../actions/AuthActions';

import LoginBtn from '../components/LoginBtn';

function mapStateToProps(state) {
  return {
    userAuthSession: state.userAuthSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogin:(token)=>{
      dispatch(attemptLogin(token));
    }
  };
}


const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBtn);


export default LoginPage;
