import React, {Component} from 'react';
import ProfileStats from './ProfileStats';

import '../../styles/ProfilePage.css';

class ProfilePage extends Component{

	render() {
		return (
			<div>
  			<ProfileStats user={this.props.user} />
			</div>

			)
	}
}


export default ProfilePage;
