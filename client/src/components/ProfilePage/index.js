import React, {Component} from 'react';
import ProfileStats from './ProfileStats';

import '../../styles/ProfilePage.css';

// TODO: fetch user's comments ordered by date
var comments = [
{
  "id":"001",
  "username":"Leon",
  "dropId": "001",
  "userId":"001",
  "userAvatar":"http://dropdev.com/avatar/001",
  "text":"maybe you should czech the fridge",
  "createdAt": "2016-08-23T18:25:43.511Z"
},
{
  "id":"002",
  "username":"Thanh",
  "dropId": "001",
  "userId":"002",
  "userAvatar":"http://dropdev.com/avatar/002",
  "text":"im russian to the kitchen",
  "createdAt": "2016-08-23T18:49:43.511Z"
},
]
class ProfilePage extends Component{

	render() {
		return (
  		  <ProfileStats user={this.props.user} comments={comments}/>
			)
	}
}


export default ProfilePage;
