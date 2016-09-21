import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';
import {setLocation} from '../actions/LngLatActions';

import AddComponent from '../components/AddComponent';

function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    location: state.location ? state.location.lngLat : null,
    selectedDrop: state.selectedDrop,
    drops: state.drops.drops
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: (msg)=> dispatch(passSnackbarMessage(msg)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
  };
}


const AddPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComponent);


export default AddPage;
