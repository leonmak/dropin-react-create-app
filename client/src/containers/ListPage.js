import {connect} from 'react-redux';

import {fetchAllNearbyDrops, updateANearbyDrop, passingFromOthersToDrop, updateCommentInListPage} from '../actions';
import {setLocation} from '../actions/LngLatActions';

import ListComponent from '../components/ListComponent';

function mapStateToProps(state) {
  return {
    drops: state.drops,
    location: state.location.lngLat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	fetchAllNearbyDrops:() => dispatch(fetchAllNearbyDrops()),
    updateANearbyDrop: drop => dispatch(updateANearbyDrop(drop)),
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
    updateCommentInListPage: comment=>dispatch(updateCommentInListPage(comment))

  };
}


const ListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);


export default ListPage;
