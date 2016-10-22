import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';
import {fetchAllNearbyDrops, updateANearbyDrop, selectedDropSrc, passingFromOthersToDrop} from '../actions';
import {setLocation} from '../actions/LngLatActions';

import MapPageComponent from '../components/MapPageComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    location: state.location.lngLat,
    drops: state.drops.drops,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllNearbyDrops: (userId) => dispatch(fetchAllNearbyDrops(userId)),
    updateANearbyDrop: drop => dispatch(updateANearbyDrop(drop)),
    passSnackbarMessage: msg => dispatch(passSnackbarMessage(msg)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop)),
    selectedDropSrc: src => dispatch(selectedDropSrc(src)),
  };
}

const MapPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPageComponent);


export default MapPage;
