export const SET_LNG_LAT = 'SET_LNG_LAT';

export function setLocation(lngLat) {
  return{
    type: SET_LNG_LAT,
    lngLat
  }
}
