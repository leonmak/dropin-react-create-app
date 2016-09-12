import React, {Component} from 'react';
import ProfileStats from './ProfileStats';

import '../../styles/ProfilePage.css';

var user = {
  "id": "001",
  "name": "Leon Mak",
  "facebookId": "590597559",
  "drops": 1,
  "picks": 12,
  "comments": 12,
};

class ProfilePage extends Component{

	render() {
		return (
			<div>
  			<ProfileStats user={user} />
			</div>

			)
	}
}


export default ProfilePage;
