import {connect} from 'react-redux';

import {attemptLogout} from '../actions/AuthActions';

import SettingsPageComponent from '../components/SettingsPageComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogout: token => dispatch(attemptLogout())
  };
}


const SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPageComponent);


export default SettingsPage;
