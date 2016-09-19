import {TOGGLE_BOTTOM_BAR_VISIBILITY, TOGGLE_TOP_BAR_BACK_BUTTON} from '../actions';

//designing state shape
const initialState = {
	bottomBarVisibility: true,
	topBarBackButtonVisibility: false
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

/*export function bottomBarVisible(state = {bottomBarVisibility:true}, action) {
	switch (action.type) {
		case TOGGLE_BOTTOM_BAR_VISIBILITY:
		return Object.assign({}, state, {
			bottomBarVisibility: action.visibility
		})
		default:
		return state
	}
}

export function topBarBackButtonVisible(state = {topBarBackButtonVisibility:false}, action) {
	switch (action.type) {
		case TOGGLE_BOTTOM_BAR_VISIBILITY:
		return Object.assign({}, state, {
			topBarBackButtonVisible: action.visibility
		})
		default:
		return state
	}
}*/
