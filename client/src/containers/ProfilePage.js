import {connect} from 'react-redux';

import ProfilePageComponent from '../components/ProfilePageComponent';
import {passSnackbarMessage} from '../actions/SnackBarActions';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg))
  };
}


const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent);


export default ProfilePage;
