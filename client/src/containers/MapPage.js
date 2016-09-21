import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';
import {passingFromOthersToDrop} from '../actions';
import {setLocation} from '../actions/LngLatActions';

import MapPageComponent from '../components/MapPageComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    location: state.location.lngLat,
    drops: state.drops,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: msg => dispatch(passSnackbarMessage(msg)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop)),
  };
}

const MapPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPageComponent);


export default MapPage;
