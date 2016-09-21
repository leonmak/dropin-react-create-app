import * as BackendHelper from '../BackendHelper';

export const FETCH_ALL_NEARBY_DROPS = 'FETCH_ALL_NEARBY_DROPS';
export const FETCH_COMMENT_FOR_DROP = 'FETCH_COMMENT_FOR_DROP';
export const UPDATE_A_NEARBY_DROP = 'UPDATE_A_NEARBY_DROP';
export const PASSING_FROM_OTHERS_TO_DROP = 'PASSING_FROM_OTHERS_TO_DROP';
export const FETCH_ALL_MY_DROPS = 'FETCH_ALL_MY_DROPS';
export const CLEAR_SINGLE_DROP_HISTORY = 'CLEAR_SINGLE_DROP_HISTORY';

/***********************************************************************
ACTION IS CALLED ON THE LIST PAGE
***********************************************************************/

//function for you to call to fetch all nearby drops
export function fetchAllNearbyDrops(){
	return (dispatch)=>{
		BackendHelper.getAllDrops()
		.then(response=>dispatch(receiveAllNearbyDrops(response)));
	}
}

//function to pipe all nearby drops fetched above to
//reducer and modify the state of the program
function receiveAllNearbyDrops(allNearbyDrops){
	return{
		type: FETCH_ALL_NEARBY_DROPS,
		drops: allNearbyDrops
	}
}

//function to add a nearby drop when it is detected
//called on list page to update current drops
export function updateANearbyDrop(drop){
	return{
		type: UPDATE_A_NEARBY_DROP,
		drop: drop
	}
}

/***********************************************************************
ACTION IS CALLED ON THE DROP PAGE
***********************************************************************/

//function to fetch all comments for a single drop
function fetchCommentsForDrop(dropId){
	return (dispatch)=>{
		BackendHelper.getSingleDropComments(dropId)
		.then(response=>dispatch(receiveCommentsForDrop(response)));
	}
}

//function to pipe all comments received from
//reducer and modify the state of the program
function receiveCommentsForDrop(comments){
	return{
		type: FETCH_COMMENT_FOR_DROP,
		comments: comments
	}
}

export function clearSingleDropHistory(){
	return{
		type: CLEAR_SINGLE_DROP_HISTORY
	}
}

/***********************************************************************
ACTION IS CALLED ON LIST->DROP OR PROFILE->DROP
***********************************************************************/
/*
export function getDropId(callback){
	callback(dropId);
}*/

//action to pass drop object from list to drop
export function passingFromOthersToDrop(drop){

	return (dispatch)=>{
		dispatch(fetchCommentsForDrop(drop.dropId));
		dispatch(populatingDropFromOthrs(drop));
	}
}

function populatingDropFromOthrs(drop){
	return{
		type: PASSING_FROM_OTHERS_TO_DROP,
		drop: drop
	}
}


/***********************************************************************
ACTION IS CALLED ON PROFILE PAGE
***********************************************************************/

//action to get drops for one user
export function fetchAllMyDrops(userId){
	return (dispatch)=>{
		BackendHelper.getMyDrops(userId)
		.then(response=>dispatch(receiveAllMyDrops(response)));
	}
}

export function receiveAllMyDrops(allMyDrops){
	return{
		type: FETCH_ALL_MY_DROPS,
		drops: allMyDrops
	}
}

/*export function selectDrop()*/

