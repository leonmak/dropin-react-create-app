import React, {Component} from 'react';
import ProfileStats from './ProfileStats';

import '../../styles/ProfilePage.css';

// TODO: fetch user's comments ordered by date
var comments = [
{
  "id":"001",
  "username":"Leon",
  "dropId": "0123adf",
  "userId":"001",
  "userAvatarId":"drop/asdf123",
  "text":"maybe you should czech the fridge",
  "createdAt": "2016-08-23T18:25:43.511Z"
},
{
  "id":"002",
  "username":"Thanh",
  "dropId": "0123adf",
  "userId":"002",
  "userAvatarId":"drop/sdfa123",
  "text":"im russian to the kitchen",
  "createdAt": "2016-08-23T18:49:43.511Z"
},
]

// TODO fetch and store
var drops = [
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
}
]
class ProfilePage extends Component{

	render() {
		return (
  		  <ProfileStats user={this.props.user} comments={comments} drops={drops} />
			)
	}
}


export default ProfilePage;
