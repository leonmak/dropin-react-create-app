import {connect} from 'react-redux';

import {attemptLogout} from '../actions/AuthActions';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import SettingsPageComponent from '../components/SettingsPageComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg)),
    attemptLogout: () => dispatch(attemptLogout())
  };
}


const SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageComponent);


export default SettingsPage;
