import {FETCH_ALL_MY_DROPS, UPDATE_A_NEARBY_DROP} from '../actions';

//designing state shape
const initialState = {
	drops: [],
	comments: []
}

export function profile(state=initialState, action) {

	switch (action.type) {

		case FETCH_ALL_MY_DROPS:
		return Object.assign({}, state, {
			drops: action.drops.body
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