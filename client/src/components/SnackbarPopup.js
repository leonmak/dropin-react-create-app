import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const SnackbarPopup = ({hideSnackBar, isOpen, message }) =>
  <Snackbar
    open={ isOpen }
    message={ message }
    autoHideDuration={3000}
    onRequestClose={hideSnackBar} />;

export default SnackbarPopup;
