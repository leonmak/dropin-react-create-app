import {FETCH_ALL_NEARBY_DROPS, ADD_A_NEARBY_DROP} from '../actions';

//designing state shape
const initialState = {
	drops: []
}

export function drops(state=initialState, action) {

	switch (action.type) {

		case FETCH_ALL_NEARBY_DROPS:
		return Object.assign({}, state, {
			drops: action.drops.body
		})

		//need logic to append new drops here
		/*case ADD_A_NEARBY_DROP:
		return Object.assign({}, state, {
			drops: action.drop
		})*/
		default:
		return state
	}
}