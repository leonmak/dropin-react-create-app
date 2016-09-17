import {connect} from 'react-redux';

import {toggleBottomBarVisibility} from '../actions';
import {toggleTopBarBackButtonVisibility} from '../actions';
import {fetchCommentsForDrop} from '../actions';

import DropComponent from '../components/DropComponent';


//the reducers are the start of the state
function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility,
    selectedDrop: state.selectedDrop
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	toggleBottomBar:(visibility)=>{
  		dispatch(toggleBottomBarVisibility(visibility));
  	},
    toggleTopBarBackButton:(visibility)=>{
      dispatch(toggleTopBarBackButtonVisibility(visibility));
    },
    fetchCommentsForDrop:(dropId)=>{
      dispatch(fetchCommentsForDrop(dropId));
    }
  };
}


const DropPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropComponent);


export default DropPage;