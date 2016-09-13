import React from 'react';
import Avatar from 'material-ui/Avatar';

import * as fb from '../../utils/facebook-url';
import * as text from '../../utils/text';

const ProfileStats = ({user}) => (
  <div>
  <div className="row center-xs profile-container bg-cyan-300">
    <div className="col-xs-12 profile-pic">
      <Avatar
        src={fb.profileImg(user.facebookId, 90)}
        size={100}
      />
    </div>
    <div className="col-xs-12 profile-fb">
      <h2>{user.name}</h2>
      <a target="_window" href={fb.msgUrl(user.facebookId)}>Message on Facebook</a>
    </div>
    <div className="col-xs-12 ">
      <div className="row center-xs">
        <div className="col-xs-3 profile-stat"><p>{user.drops}</p><small>{text.pluralizer('drop', user.drops)}</small></div>
        <div className="col-xs-3 profile-stat"><p>{user.comments}</p><small>{text.pluralizer('comment', user.comments)}</small></div>
      </div>
    </div>
  </div>
  </div>
);

export default ProfileStats;
