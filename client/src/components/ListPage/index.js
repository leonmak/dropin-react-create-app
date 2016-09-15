import React, { Component } from 'react';
import {List} from './List';


//dummy data
// location is [lng, lat]
var data = [
{
  "dropId": "001",
  "username":"Anon",
  "userId":"-1",
  "userAvatarId":"ANONID",
  "emojiUni": "1f600",
  "title": "Today's event in LT7 is sooooo boring!",
  "votes": 4,
  "location": [103.7732086, 1.3067225],
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
 "location": [103.773379, 1.2970880],
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
 "location": [103.7730933, 1.3056169],
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
 "location": [103.7732217, 1.3056169],
 "date": "2016-09-08T11:06:43.511Z",
 "replies": 10
}
];

const geoListener = (cb) => {
  return navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => cb(coords),
    (err) => console.log('Unable to find position - ' + err.message),
    { enableHighAccuracy: true, timeout: 15000 }
  )
}

export default class ListPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      userLocation: null
    }
    this.geoId = null;
  }

  updateLocation(coords) {
    console.log(coords);
    this.setState({userLocation: [coords.longitude, coords.latitude]});
  }

  componentDidMount() {
    this.geoId = geoListener(this.updateLocation.bind(this));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return (
      <List feed={data} userLocation={this.state.userLocation} />
    )
  }
}
