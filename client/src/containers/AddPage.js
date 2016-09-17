import {connect} from 'react-redux';


import AddComponent from '../components/AddComponent';


//the reducers are the start of the state
/*function mapStateToProps(state) {
  return {
  };
}*/

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


const AddPage = connect(
  null,
  mapDispatchToProps
)(AddComponent);


export default AddPage;