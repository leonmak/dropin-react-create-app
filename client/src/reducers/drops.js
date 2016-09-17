import {FETCH_ALL_NEARBY_DROPS} from '../actions';

//designing state shape
const initialState = {
	drops: []
}

export function drops(state=initialState, action) {

	switch (action.type) {

		case FETCH_ALL_NEARBY_DROPS:
		return Object.assign({}, state, {
			drops: action.drops
		})
		default:
		return state
	}
}