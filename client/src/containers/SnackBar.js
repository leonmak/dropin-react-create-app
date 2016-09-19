import React from 'react';
import { connect } from 'react-redux';
import {toggleSnackbar} from '../actions/SnackBarActions';

import SnackbarPopup from '../components/SnackbarPopup';

const mapStateToProps = (state) => {
  return {
    isOpen: state.snackbar.snackbarVisibility,
    message: state.snackbar.snackbarMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSnackBar: ()=> dispatch(toggleSnackbar(false))
  };
};

const SnackBar = connect(mapStateToProps, mapDispatchToProps)(SnackbarPopup);

export default SnackBar;
