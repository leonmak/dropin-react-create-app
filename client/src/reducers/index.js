import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {pageVisibility} from './pageVisibility.js';
import {drops} from './drops.js';
import {selectedDrop} from './selectedDrop.js';
import { updateUserInfo } from './AuthReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  pageVisibility: pageVisibility,
  drops: drops,
  selectedDrop:selectedDrop,
  userAuthSession: updateUserInfo,

});

export default rootReducer;
