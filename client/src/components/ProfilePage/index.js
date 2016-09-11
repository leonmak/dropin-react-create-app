import React, {Component} from 'react';
import {Profile} from './Profile';
import {ProfileDetails} from './ProfileDetails';
import '../../styles/colors.css';
import '../../styles/ProfilePage.css';

class ProfilePage extends Component{
	render() {
		return (
			<div>
			<Profile/>
			<ProfileDetails/>
			</div>
			
			)
	}
}


export default ProfilePage;