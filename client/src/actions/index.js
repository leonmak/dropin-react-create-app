export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';
export const TOGGLE_TOP_BAR_BACK_BUTTON = 'TOGGLE_TOP_BAR_BACK_BUTTON';


/*export const toggleBottomBarVisibility = (visibility) => {
  return {
    type: TOGGLE_BOTTOM_BAR_VISIBILITY,
    visibility: visibility
  }
}*/

export function toggleBottomBarVisibility(visibility){
	return{
		type: TOGGLE_BOTTOM_BAR_VISIBILITY,
		visibility
	}
}

export function toggleTopBarBackButtonVisibility(visibility){
	return{
		type: TOGGLE_TOP_BAR_BACK_BUTTON,
		visibility
	}	
}