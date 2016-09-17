import {FETCH_COMMENT_FOR_DROP} from '../actions';

//designing initial state
const initialState = {
	drop:{},
	comments: []
}

export function pageVisibility(state=initialState, action) {

	switch (action.type) {
		case TOGGLE_BOTTOM_BAR_VISIBILITY:
		return Object.assign({}, state, {
			bottomBarVisibility: action.visibility
		})
		case TOGGLE_TOP_BAR_BACK_BUTTON:
		return Object.assign({}, state, {
			topBarBackButtonVisibility: action.visibility
		})
		default:
		return state
	}
}