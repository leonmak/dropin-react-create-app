import request from 'superagent';
import {passSnackBarAction} from './SnackBarActions'
export const VOTE_INITIAL_UI_UPDATE = 'VOTE_INITIAL_UI_UPDATE';
//export const VOTE_UNDO_INITIAL_UI_UPDATE = 'VOTE_UNDO_INITIAL_UI_UPDATE';
//export const VOTE_CONFIRM_INITIAL_UI_UPDATE = 'VOTE_CONFIRM_INITIAL_UI_UPDATE';
export const UPDATE_MY_VOTE_IN_LIST_PAGE='UPDATE_MY_VOTE_IN_LIST_PAGE';
export const UPDATE_OTHERS_VOTE_IN_LIST_PAGE='UPDATE_OTHERS_VOTE_IN_LIST_PAGE';

import SocketHandler from '../SocketHandler'; 

/*VOTE ACTION 
*/
export function makeAVote(dropId, voteAction, initialVoted, userId){
	return(dispatch)=>{
		dispatch(voteInitialUIUpdate(dropId,voteAction,initialVoted));
		var socketHandler = new SocketHandler();
		socketHandler.setup('votes',{postId: dropId},getNewVote);
		
		if(voteAction===1){
			if(initialVoted===1){
				socketHandler.vote({userId: userId, postId: dropId, voteType: 0});
			}
			if(initialVoted===0){
				socketHandler.vote({userId: userId, postId: dropId, voteType: 1});
			}
			if(initialVoted===-1){
				socketHandler.vote({userId: userId, postId: dropId, voteType: 1});
			}
		}
		if(voteAction===-1){
			if(initialVoted===1){
				socketHandler.vote({userId: userId, postId: dropId, voteType: -1});
			}
			if(initialVoted===0){
				socketHandler.vote({userId: userId, postId: dropId, voteType: -1});
			}
			if(initialVoted===-1){
				socketHandler.vote({userId: userId, postId: dropId, voteType: 0});
			}
		}
		
	}
}

function getNewVote(data){
}

export function updateMyVoteInListPage(vote){
	console.log('updating my vote');
	return {
		type: UPDATE_MY_VOTE_IN_LIST_PAGE,
		vote: vote
	};
}

export function updateOthersVoteInListPage(vote){
	console.log('updating other vote');
	return {
		type: UPDATE_OTHERS_VOTE_IN_LIST_PAGE,
		vote: vote
	};
}


function voteInitialUIUpdate(dropId,voteAction,initialVoted){
	return {
		type: VOTE_INITIAL_UI_UPDATE,
		dropId: dropId,
		voteAction: voteAction,
		initialVoted: initialVoted
	}
}

/*function undoInitialUiUpdate(dropId,voteValue){
	return {
		type: VOTE_UNDO_INITIAL_UI_UPDATE,
		dropId: dropId,
		voteValue: voteValue
	}	
}

function confirmInitialUIUpdate(dropId,voteValue){
	return {
		type: VOTE_CONFIRM_INITIAL_UI_UPDATE,
		dropId: dropId,
		voteValue: voteValue
	}	
}*/

/*VOTE ACTION*/
export function undoAVote(dropId, voteValue){
	return(dispatch)=>{
		dispatch(initialUIUpdate(dropId,voteValue));
		request
		.put('api/votes')
		.send({
			drop_id: dropId,
			vote_type: voteValue
		}).end((err,res)=>{
			console.log(res);
			//dispatch(makeAVoteUpdateUI());
		});
	}
}



/*request
    .put('/api/profile')
    .send({
      user_avatar_url: values.user_avatar_url,
      user_name: values.user_name,
      anonymous: values.anonymous,
    })*//*

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
				}*/













				/*UNVOTE ACTION*/
				export function undoAVote(voteValue){
					return{
						type: UNDO_A_VOTE,
						voteValue:voteValue
					}
				}