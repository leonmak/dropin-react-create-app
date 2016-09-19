import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List} from '../ListComponent/List';
import {CommentsList} from '../CommentsList';

import * as fb from '../../utils/facebook-url';
import * as text from '../../utils/text';

const ProfileStats = ({user, comments, drops}) => (
  <div>
  <div className="row center-xs profile-container">
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
  <div className="row center-xs">
    <div className="col-xs-12 ">
    <Tabs>
      <Tab label="Top Drops" >
        <List feed={drops} isProfile={true}/>
      </Tab>
      <Tab label="Recent Comments" >
        <CommentsList comments={comments} isProfile={true}/>
      </Tab>
    </Tabs>
    </div>

    </div>
  </div>
);

export default ProfileStats;
