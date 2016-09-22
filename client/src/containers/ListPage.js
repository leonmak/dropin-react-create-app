import {connect} from 'react-redux';

import {fetchAllNearbyDrops, updateANearbyDrop, fetchCommentsForDrop, selectedDropIdx, selectedDropSrc, updateCommentInListPage} from '../actions';
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
  	fetchAllNearbyDrops:(userId) => dispatch(fetchAllNearbyDrops(userId)),
    updateANearbyDrop: drop => dispatch(updateANearbyDrop(drop)),
    selectedDropIdx: idx => dispatch(selectedDropIdx(idx)),
    selectedDropSrc: src => dispatch(selectedDropSrc(src)),
    fetchCommentsForDrop: idx => dispatch(fetchCommentsForDrop(idx)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
    updateCommentInListPage: comment=>dispatch(updateCommentInListPage(comment))

  };
}


const ListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);


export default ListPage;
