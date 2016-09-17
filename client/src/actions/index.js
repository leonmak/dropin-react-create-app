import * as BackendHelper from '../BackendHelper';

export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';
export const TOGGLE_TOP_BAR_BACK_BUTTON = 'TOGGLE_TOP_BAR_BACK_BUTTON';
export const FETCH_ALL_NEARBY_DROPS = 'FETCH_ALL_NEARBY_DROPS';
export const FETCH_COMMENT_FOR_DROP = 'FETCH_COMMENT_FOR_DROP';

//default is visible (true)
export function toggleBottomBarVisibility(visibility){
	return{
		type: TOGGLE_BOTTOM_BAR_VISIBILITY,
		visibility
	}
}

//default is invisible (false)
export function toggleTopBarBackButtonVisibility(visibility){
	return{
		type: TOGGLE_TOP_BAR_BACK_BUTTON,
		visibility
	}	
}

export function fetchCommentsForDrop(drop){
	return{
		type: FETCH_COMMENT_FOR_DROP,
		drop
	}	
}

//function for you to call to fetch all nearby drops
export function fetchAllNearbyDrops(){
	return (dispatch)=>{
		BackendHelper.getAllDrops()
		.then(response=>dispatch(receiveAllNearbyDrops(response)));
	} 
}

//function to pipe all nearby drops fetched above to reducer and modify the
//state of the program 
function receiveAllNearbyDrops(allNearbyDrops){
	return{
		type: FETCH_ALL_NEARBY_DROPS,
		drops: allNearbyDrops
	}	
}



/*
subreddit example
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}*/