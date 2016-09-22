import request from 'superagent';
import {passSnackBarAction} from './SnackBarActions'
export const VOTE_INITIAL_UI_UPDATE = 'VOTE_INITIAL_UI_UPDATE';
export const VOTE_UNDO_INITIAL_UI_UPDATE = 'VOTE_UNDO_INITIAL_UI_UPDATE';
export const VOTE_CONFIRM_INITIAL_UI_UPDATE = 'VOTE_CONFIRM_INITIAL_UI_UPDATE';
import SocketHandler from '../SocketHandler'; 

/*VOTE ACTION 
*/
export function makeAVote(dropId, voteAction, initialVoted, userId){
	return(dispatch)=>{
		dispatch(voteInitialUIUpdate(dropId,voteAction,initialVoted));
		var socketHandler = new SocketHandler();
		socketHandler.setup('votes',{postId: dropId},getNewVote);
		//vote({userId, postId, voteType}) 
		socketHandler.vote({userId: userId, postId: dropId, voteType: voteAction});
		//socketHandler.uninstall();

		/*request
		.put('api/votes')
		.send({
			drop_id: dropId,
			vote_type: voteValue
		}).end((err,res)=>{
			console.log(res);
			//dispatch(makeAVoteUpdateUI());
		});*/
	}
}

function getNewVote(data){
}

export function updateMyVoteInListPage(vote){
	console.log('updating my vote');
	return {};
}

export function updateOthersVoteInListPage(vote){
	console.log('updating other vote');
	return {};
}
	

function voteInitialUIUpdate(dropId,voteAction,initialVoted){
	return {
		type: VOTE_INITIAL_UI_UPDATE,
		dropId: dropId,
		voteAction: voteAction,
		initialVoted: initialVoted
	}
}

function undoInitialUiUpdate(dropId,voteValue){
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
}

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
    })*/













/*UNVOTE ACTION*/
export function undoAVote(voteValue){
	return{
		type: UNDO_A_VOTE,
		voteValue:voteValue
	}
}