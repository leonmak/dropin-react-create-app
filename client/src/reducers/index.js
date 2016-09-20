import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {pageVisibility} from './pageVisibility.js';
import {drops} from './drops.js';
import {selectedDrop} from './selectedDrop.js';
import { updateUserInfo } from './AuthReducer';
import { snackbar } from './SnackbarReducer';
import {profile} from './profile.js';
import { location } from './LngLatReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  pageVisibility,
  drops,
  selectedDrop,
  userAuthSession: updateUserInfo,
  profile: profile,
  snackbar,
  location
});

export default rootReducer;
