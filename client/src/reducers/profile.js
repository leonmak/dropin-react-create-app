import {FETCH_ALL_MY_DROPS, UPDATE_A_NEARBY_DROP,
	FETCH_ALL_MY_COMMENTS, FETCH_ALL_MY_VOTES} from '../actions';

//designing state shape
const initialState = {
	drops: [],
	comments: [],
	votes: {
		"upvotes": 0,
		"downvotes": 0
	}
}

export function profile(state=initialState, action) {

	switch (action.type) {

		case FETCH_ALL_MY_DROPS:
		return Object.assign({}, state, {
			drops: action.drops.body
		})

		case FETCH_ALL_MY_COMMENTS:
		return Object.assign({}, state, {
			comments: action.comments.body
		})

		case FETCH_ALL_MY_VOTES:
		return Object.assign({}, state, {
			votes: action.votes.body
		})

		//need logic to append new drops here
		case UPDATE_A_NEARBY_DROP:
		state.drops.push(action.drop);
		console.log('newstate', state);
		return Object.assign({}, state, {
			drops: state.drops
		})


		default:
		return state
	}
}