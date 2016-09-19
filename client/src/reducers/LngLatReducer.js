import {SET_LNG_LAT} from '../actions/LngLatActions';

const initialState = {
  lngLat: [103.8198, 1.3224],
}

export function location(state=initialState, action) {
  switch (action.type) {
    case SET_LNG_LAT:
      if(action.lngLat)
        return Object.assign({}, {
          lngLat: action.lngLat,
        })
      break;
    default:
      return state
  }
}
