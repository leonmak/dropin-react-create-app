<<<<<<< HEAD
import React, {Component} from 'react';

class SettingsPage extends Component {
  render() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
            <Settings />
        </div>
      </div>
    )
  }
}

export default SettingsPage;
=======
import React from 'react';
import Avatar from 'material-ui/Avatar';
import * as fb from '../../utils/facebook-url';
import ImageUpload from '../ImageUpload';

const SettingsPage = (props) => (
  <div className="row center-xs profile-container bg-cyan-300">
    <div className="col-xs-12 profile-pic">
      <Avatar
        src={fb.profileImg(props.user.facebookId, 90)}
        size={100}
      />

    </div>
      <ImageUpload />
  </div>
)

export default SettingsPage;
>>>>>>> 64b63eca7433ddd9a464190ae4ba01d1e55aba4e
