import React from 'react';
import {List} from './List';


//dummy data
//changed location from [1.2970879,103.773379] [lat,lng] to distance from you in meters
var data = [
{
  "id": "001",
  "username":"Anonymous",
  "userId":"-1",
  "userAvatar":"AnonId",
  "emojiUni": "1f600",
  "title": "Today's event in LT7 is sooooo boring!",
  "votes": 4,
  "distance": 1560,
  "videoId": "tntOCGkgt98",
  "time": "2016-08-23T18:25:43.511Z",
  "replies": 10
},
{
 "id": "002",
 "username":"Kai Yi",
 "userId":"003",
 "userAvatar":"http://dropdev.com/avatar/003",
 "emojiUni": "1f601",
 "title": "Who else is angry at the guy who just cut our queue at the drink store!",
 "imageId":"drop/krgnkzb3ie4uiwgdlpxb",
 "votes": 10,
 "distance": 10876,
 "time": "2016-09-06T12:45:43.511Z",
 "replies": 5
},
{
 "id": "003",
 "username":"Leon",
 "userId":"002",
 "userAvatar":"http://dropdev.com/avatar/002",
 "soundCloudUrl": "https://soundcloud.com/dirtwire/belton-sutherland-vs-haywyre",
 "imageId": "drop/gmzf4d8vbyxc50wefkap",
 "emojiUni": "1f602",
 "title": "To the cute guy studying outside the LT, WOWOW",
 "votes": 6,
 "distance": 9887,
 "time": "2016-09-08T11:06:43.511Z",
 "replies": 12
},
{
 "id": "004",
 "username":"Thanh",
 "userId":"001",
 "userAvatar":"http://dropdev.com/avatar/001",
 "emojiUni": "1f603",
 "title": "We dont drink and derive LOL",
 "votes": 15,
 "distance": 765,
 "time": "2016-09-08T11:06:43.511Z",
 "replies": 10
}
];

const ListPage = (props) => (
  <List feed={data} />
)

export default ListPage;
