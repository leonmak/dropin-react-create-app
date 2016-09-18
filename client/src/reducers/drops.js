import {FETCH_ALL_NEARBY_DROPS, UPDATE_A_NEARBY_DROP} from '../actions';

//designing state shape
const initialState = {
	drops: []
}

/* "dropId": "003",
 "username":"Leon",
 "userId":"002",
 "userAvatarId":"drop/002idasdf",
 "imageId": "drop/gmzf4d8vbyxc50wefkap",
 "emojiUni": "1f602",
 "title": "To the cute guy studying outside the LT, WOWOW",
 "votes": 6,
 "location": [103.7730933, 1.3056169],
 "date": "2016-09-08T11:06:43.511Z",
 "replies": 12*/

export function drops(state=initialState, action) {

	switch (action.type) {

		case FETCH_ALL_NEARBY_DROPS:
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