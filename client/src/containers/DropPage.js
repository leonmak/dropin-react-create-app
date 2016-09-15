import {connect} from 'react-redux';

import {toggleBottomBarVisibility} from '../actions';
import {toggleTopBarBackButtonVisibility} from '../actions';

import DropComponent from '../components/DropComponent';


function mapStateToProps(state) {
  return {
    pageVisibility: state.pageVisibility
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	hideBottomBar:(visibility)=>{
  		dispatch(toggleBottomBarVisibility(visibility));
  	},
    toggleTopBarBackButton:(visibility)=>{
      dispatch(toggleTopBarBackButtonVisibility(visibility));
    }
  };
}


const DropPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropComponent);


export default DropPage;