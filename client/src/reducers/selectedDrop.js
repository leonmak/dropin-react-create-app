import {FETCH_COMMENT_FOR_DROP, PASSING_FROM_OTHERS_TO_DROP, 
	CLEAR_SINGLE_DROP_HISTORY, UPDATE_COMMENT_IN_DROP_PAGE} from '../actions';

//designing initial state
const initialState = {
	selectedDrop:{},
	comments: []
}
function newCommentState(stateComment, actionComment){
	return stateComment.push(actionComment);
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
		
		case UPDATE_COMMENT_IN_DROP_PAGE:
		var oldComments = state.comments;
		oldComments.push(action.comment);
		//var newComments = this.newCommentState(state.comments, action.comment);
		return Object.assign({}, state, {
			selectedDrop: state.selectedDrop,
			comments: oldComments
		})

		default: 
		return state
	}
}