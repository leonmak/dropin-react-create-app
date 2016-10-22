export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';
export const PASS_SNACKBAR_MESSAGE = 'PASS_SNACKBAR_MESSAGE';

export function toggleSnackbar(visibility){
  return{
    type: TOGGLE_SNACKBAR,
    visibility
  }
}

export function passSnackbarMessage(message){
  return{
    type: PASS_SNACKBAR_MESSAGE,
    message
  }
}