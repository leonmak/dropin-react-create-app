import {TOGGLE_SNACKBAR, PASS_SNACKBAR_MESSAGE} from '../actions/SnackBarActions';

const initialState = {
  snackbarVisibility: false,
  snackbarMessage: ""
}

export function snackbar(state=initialState, action) {
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      if(action.visibility === true || action.visibility === false)
        return Object.assign({}, state, {
          snackbarVisibility: action.visibility
        })
    case PASS_SNACKBAR_MESSAGE:
      if(action.message)
        return Object.assign({}, {
          snackbarVisibility: true,
          snackbarMessage: action.message
        })
    default:
      return state
  }
}
