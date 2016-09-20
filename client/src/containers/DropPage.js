import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import {toggleBottomBarVisibility} from '../actions/PageVisibilityActions';
import {toggleTopBarBackButtonVisibility} from '../actions/PageVisibilityActions';
import { clearSingleDropHistory} from '../actions';

import DropComponent from '../components/DropComponent';


//the reducers are the start of the state
function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility,
    selectedDrop: state.selectedDrop,
    user: state.userAuthSession.userObject,
    location: state.location.lnglat
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	toggleBottomBar:(visibility)=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarBackButton:(visibility)=>dispatch(toggleTopBarBackButtonVisibility(visibility)),
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg)),
    clearSingleDropHistory: ()=>dispatch(clearSingleDropHistory())
  };
}


const DropPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropComponent);


export default DropPage;
