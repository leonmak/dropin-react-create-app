import {
	FETCH_COMMENT_FOR_DROP,
	PASSING_FROM_OTHERS_TO_DROP,
	CLEAR_SINGLE_DROP_HISTORY,
	UPDATE_COMMENT_IN_DROP_PAGE,
	SELECT_DROP_IDX,
	SELECT_DROP_SRC,
} from '../actions';

import {MAKE_A_VOTE_DROP_PAGE, MAKE_A_VOTE_DROP_PAGE_SRC_LIST} from '../actions/VoteActions'

//designing initial state
const initialState = {
	selectedDrop:null,
	comments: [],
	selectedDropIdx: null,
	selectedDropSrc: ""
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
		var newDropState = state.selectedDrop;
		newDropState.replies = state.selectedDrop.replies+1;
		return Object.assign({}, state, {
			selectedDrop: newDropState,
			comments: oldComments
		})

		case SELECT_DROP_IDX:
		return Object.assign({}, state, {
			selectedDropIdx: action.selectedDropIdx
		})

		case SELECT_DROP_SRC:
		return Object.assign({}, state, {
			selectedDropSrc: action.selectedDropSrc
		})

		case MAKE_A_VOTE_DROP_PAGE:
		console.log('hello from selectedDrop reducer');
		return Object.assign({}, state, {
		})

		case MAKE_A_VOTE_DROP_PAGE_SRC_LIST:
		console.log('hello from drops reducer, src clicked');
		return Object.assign({}, state, {
		})

		default:
		return state
	}
}
