import {FETCH_COMMENT_FOR_DROP, PASSING_FROM_OTHERS_TO_DROP, CLEAR_SINGLE_DROP_HISTORY} from '../actions';

//designing initial state
const initialState = {
	selectedDrop:{},
	comments: []
}

export function selectedDrop(state=initialState, action) {

	switch (action.type) {
		case FETCH_COMMENT_FOR_DROP:
		return Object.assign({}, state, {
			comments: action.comments.body
		})
		case PASSING_FROM_OTHERS_TO_DROP:
		return Object.assign({}, state, {
			selectedDrop: action.drop
		})
		case CLEAR_SINGLE_DROP_HISTORY:
		return Object.assign({}, state, {
			selectedDrop:{},
			comments:[]
		})
		
		default: 
		return state
	}
}