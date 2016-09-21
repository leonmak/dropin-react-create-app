import {connect} from 'react-redux';

import {fetchAllNearbyDrops, updateANearbyDrop, populatingDropFromOthrs, selectedDropIdx} from '../actions';
import {setLocation} from '../actions/LngLatActions';

import ListComponent from '../components/ListComponent';

function mapStateToProps(state) {
  return {
    drops: state.drops,
    location: state.location.lngLat,
    user: state.userAuthSession.userObject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	fetchAllNearbyDrops:() => dispatch(fetchAllNearbyDrops()),
    updateANearbyDrop: drop => dispatch(updateANearbyDrop(drop)),
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop)),
    selectedDropIdx: idx => dispatch(selectedDropIdx(idx)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
  };
}


const ListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);


export default ListPage;
