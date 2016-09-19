import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';

import AddComponent from '../components/AddComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg))
  };
}


const AddPage = connect(
  null,
  mapDispatchToProps
)(AddComponent);


export default AddPage;
