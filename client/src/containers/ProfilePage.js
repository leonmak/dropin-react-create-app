import {connect} from 'react-redux';

import ProfilePageComponent from '../components/ProfilePageComponent';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import {fetchAllMyDrops, fetchAllMyComments, fetchAllMyVotes, passingFromOthersToDrop, selectedDropIdx, selectedDropSrc, fetchCommentsForDrop} from '../actions';

///import {}

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg) => dispatch(passSnackbarMessage(msg)),
    fetchAllMyDrops:(userId) => dispatch(fetchAllMyDrops(userId)),
    fetchAllMyComments:(userId) => dispatch(fetchAllMyComments(userId)),
    fetchAllMyVotes:(userId) => dispatch(fetchAllMyVotes(userId)),
    selectedDropIdx: idx => dispatch(selectedDropIdx(idx)),
    selectedDropSrc: src => dispatch(selectedDropSrc(src)),
    fetchCommentsForDrop: idx => dispatch(fetchCommentsForDrop(idx)),
  };
}


const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent);


export default ProfilePage;
