import {connect} from 'react-redux';
import {passSnackbarMessage} from '../actions/SnackBarActions';
import {passingFromOthersToDrop} from '../actions';
import {setLocation} from '../actions/LngLatActions';

import MapPageComponent from '../components/MapPageComponent';

var dummyData = [
  {
    "dropId": "001",
    "username":"Anon",
    "userId":"-1",
    "userAvatarId":"ANONID",
    "emojiUni": "1f600",
    "title": "Today's event in LT7 is sooooo boring!",
    "votes": 4,
    "location": [103.8198, 1.3224],
    "videoUrl": "https://www.youtube.com/watch?v=tntOCGkgt98",
    "date": "2016-08-23T18:25:43.511Z",
    "replies": 10
  },
  {
   "dropId": "002",
   "username":"Kai Yi",
   "userId":"003",
   "userAvatarId":"drop/003idasdf",
   "emojiUni": "1f601",
   "title": "Who else is angry at the guy who just cut our queue at the drink store!",
   "imageId":"drop/krgnkzb3ie4uiwgdlpxb",
   "votes": 10,
   "location": [103.8396853, 1.3008235],
   "date": "2016-09-06T12:45:43.511Z",
   "replies": 5
  },
  {
   "dropId": "003",
   "username":"Leon",
   "userId":"002",
   "userAvatarId":"drop/002idasdf",
   "imageId": "drop/gmzf4d8vbyxc50wefkap",
   "emojiUni": "1f602",
   "title": "To the cute guy studying outside the LT, WOWOW",
   "votes": 6,
   "location": [103.8469202, 1.343977],
   "date": "2016-09-08T11:06:43.511Z",
   "replies": 12
  },
  {
   "dropId": "004",
   "username":"Thanh",
   "userId":"001",
   "userAvatarId":"drop/001idasdf",
   "soundCloudUrl": "https://soundcloud.com/dirtwire/belton-sutherland-vs-haywyre",
   "emojiUni": "1f603",
   "title": "We dont drink and derive LOL",
   "votes": 15,
   "location": [103.8193257,1.3668445],
   "date": "2016-09-08T11:06:43.511Z",
   "replies": 10
  }
];

// TODO:replace dummydata with state.drops from redux
function mapStateToProps(state) {
  return {
    user: state.userAuthSession.userObject,
    location: state.location.lngLat,
    drops: dummyData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    passSnackbarMessage: msg => dispatch(passSnackbarMessage(msg)),
    setLocation: lngLat => dispatch(setLocation(lngLat)),
    passingFromOthersToDrop: drop => dispatch(passingFromOthersToDrop(drop)),
  };
}

const MapPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPageComponent);


export default MapPage;
