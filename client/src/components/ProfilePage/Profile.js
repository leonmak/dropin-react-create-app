import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';

import user from '../../res/user.png';

import '../../styles/ProfilePage.css';


export class Profile extends Component {
  state = {
    profile: 'hi'
  }


  render() {
    return(
      <div>
      <div className="row center-xs top-container">
      <div className="col-xs-12 bg-blue-200">
      Hello, {this.state.profile} !
      </div>
      </div>

      <div className="row center-xs middle-container">
      <div className="col-xs-12">
      <Avatar
      id="profile"
      src={user}
      size={100}/>
      </div>
      </div>
      </div>

      );
  }
}
