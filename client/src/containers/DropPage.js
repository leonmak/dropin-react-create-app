import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import {toggleBottomBarVisibility} from '../actions/PageVisibilityActions';
import {toggleTopBarBackButtonVisibility} from '../actions/PageVisibilityActions';
import {fetchCommentsForDrop} from '../actions';

import DropComponent from '../components/DropComponent';


//the reducers are the start of the state
function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility,
    selectedDrop: state.selectedDrop,
    user: state.userAuthSession.userObject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	toggleBottomBar:(visibility)=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarBackButton:(visibility)=>dispatch(toggleTopBarBackButtonVisibility(visibility)),
    fetchCommentsForDrop:(dropId)=>dispatch(fetchCommentsForDrop(dropId)),
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg))
  };
}


const DropPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropComponent);


export default DropPage;
