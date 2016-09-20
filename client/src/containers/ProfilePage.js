import {connect} from 'react-redux';

import ProfilePageComponent from '../components/ProfilePageComponent';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import {fetchAllMyDrops, passingFromOthersToDrop} from '../actions';

///import {}

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    profile: state.profile
    //drops: state.
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg)=> {
    	dispatch(passSnackbarMessage(msg));
    },
    fetchAllMyDrops:(userId)=>{
  	  dispatch(fetchAllMyDrops(userId));
  	},
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop))
  };
}


const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePageComponent);


export default ProfilePage;
