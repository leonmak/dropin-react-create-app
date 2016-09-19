import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import * as fb from '../../utils/facebook-url';
import ImageUpload from '../ImageUpload';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import '../../styles/Settings.css';

export default class SettingsPageComponent extends Component {

  render() {
    return (
    <div>
    {this.props.user &&
    <div>
      <div className="row center-xs sm-xs settings-container">
        <div className="col-xs-12 col-sm-6 profile-pic">
          <Avatar
            src={fb.profileImg(this.props.user.id, 90)}
            size={100}
          />
          <ImageUpload />
        </div>
      </div>

      <div className="row center-xs settings-options">
        <div className="col-xs-10 col-sm-6 ">
          <h2>User Settings</h2>
          <Toggle label="Anonymous" labelStyle={this.props.user.isAnon && {color:"#00bcd4"}}/>
        </div>
      </div>

      <div className="row center-xs sm-xs">
        <div className="col-xs-10 col-sm-4 ">
        <div className="row center-xs sm-xs">

          <div className="col-xs-10 col-sm-12 ">
            <RaisedButton className="settings-btn" label="Save settings" primary={true} fullWidth={true} />
          </div>

          <div className="col-xs-10 col-sm-12 ">
            <RaisedButton className="settings-btn" label="Log Out" fullWidth={true}  />
          </div>
        </div>
      </div>
      </div>

    </div>}
    </div>
    )
  }

}
