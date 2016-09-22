import {FETCH_ALL_NEARBY_DROPS, UPDATE_A_NEARBY_DROP, UPDATE_COMMENT_IN_LIST_PAGE} from '../actions';

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
		state.drops.unshift(action.drop);
		return Object.assign({}, state, {
			drops: state.drops
		})

		case UPDATE_COMMENT_IN_LIST_PAGE:
		//console.log('dropId commnent is incrementing', action.comment.dropId);
		var newDrops = state.drops;
		var arrayLength = newDrops.length;
		for (var i = 0; i < arrayLength; i++) {
			if(newDrops[i].dropId==action.comment.dropId){
				//console.log('it has been incremented');
				newDrops[i].replies = state.drops[i].replies+1;
			}
		}
		return Object.assign({}, state, {
			drops: newDrops
		})		

		default:
		return state
	}
}
