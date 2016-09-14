export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';

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