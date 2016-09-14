import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import {TOGGLE_BOTTOM_BAR_VISIBILITY} from '../actions';

function bottomBarVisible(state = {bottomBarVisibility:true}, action) {
  switch (action.type) {
    case TOGGLE_BOTTOM_BAR_VISIBILITY:
      return Object.assign({}, state, {
        bottomBarVisibility: action.visibility
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  bottomBarVisible
});

export default rootReducer;
