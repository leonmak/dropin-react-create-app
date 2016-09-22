import {FETCH_ALL_NEARBY_DROPS, UPDATE_A_NEARBY_DROP, UPDATE_COMMENT_IN_LIST_PAGE} from '../actions';
import {VOTE_INITIAL_UI_UPDATE,UPDATE_MY_VOTE_IN_LIST_PAGE,UPDATE_OTHERS_VOTE_IN_LIST_PAGE} from '../actions/VoteActions';

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





		/***********************************
		VOTE RELATED 
		***********************************/
		case VOTE_INITIAL_UI_UPDATE:
		var dropId = action.dropId;
		var newDrops = state.drops;
		var arrayLength = newDrops.length;
		for (var i = 0; i < arrayLength; i++) {
			if(newDrops[i].dropId==dropId){
				var voteAction = action.voteAction;
				var initalVoted =action.initialVoted;

				//it is an upvote
				if(voteAction===1){
					if(initalVoted===1){
						newDrops[i].votes=state.drops[i].votes-1;
						newDrops[i].voted=0;
					}
					if(initalVoted===0){
						newDrops[i].votes=state.drops[i].votes+1;
						newDrops[i].voted=1;
					}
					if(initalVoted===-1){
						newDrops[i].votes=state.drops[i].votes+2;
						newDrops[i].voted=1;
					}
				}
				//if it is downvote
				if(voteAction===-1){
					if(initalVoted===1){
						newDrops[i].votes=state.drops[i].votes-2;
						newDrops[i].voted=-1;
					}
					if(initalVoted===0){
						newDrops[i].votes=state.drops[i].votes-1;
						newDrops[i].voted=-1;
					}
					if(initalVoted===-1){
						newDrops[i].votes=state.drops[i].votes+1;
						newDrops[i].voted=0;
					}
				}
			}
		}
		return Object.assign({}, state, {
			drops: newDrops
		})

		case UPDATE_MY_VOTE_IN_LIST_PAGE:
		var dropId = action.vote.post_id;
		var changeInVote = action.vote.vote_type;
		console.log('update my votes',action);
		var newDrops = state.drops;
		var arrayLength = newDrops.length;
		for (var i = 0; i < arrayLength; i++) {
		}
		return Object.assign({}, state, {
			drops: newDrops
		})

		case UPDATE_OTHERS_VOTE_IN_LIST_PAGE:
		console.log('update others votes',action);
		var newDrops = state.drops;
		var arrayLength = newDrops.length;
		for (var i = 0; i < arrayLength; i++) {
		}
		return Object.assign({}, state, {
			drops: newDrops
		})

		default:
		return state
	}
}
