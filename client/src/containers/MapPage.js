import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import MapPageComponent from '../components/MapPageComponent';

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


const MapPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPageComponent);


export default MapPage;
