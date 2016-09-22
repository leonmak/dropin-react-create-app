import request from 'superagent';


/*VOTE ACTION*/
//updates the UI and makes the vote
export function makeAVote(dropId, voteValue){
	return(dispatch)=>{
		//dispatch(makeAVoteUpdateUI(voteValue));
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

/*function makeAVoteUpdateUI(voteValue){
	return {
		type: MAKE_A_VOTE,
		voteValue: voteValue
	}
}*/


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