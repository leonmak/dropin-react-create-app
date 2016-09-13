import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List} from '../ListPage/List'

import * as fb from '../../utils/facebook-url';
import * as text from '../../utils/text';

// TODO fetch and store
var data = [
  {
   "id": "002",
   "username":"Kai Yi",
   "userId":"003",
   "userAvatar":"http://dropdev.com/avatar/003",
   "emojiUni": "1f601",
   "title": "Who else is angry at the guy who just cut our queue at the drink store!",
   "votes": 10,
   "distance": 10876,
   "time": "2016-09-06T12:45:43.511Z",
   "replies": 5
  },
  {
    "id": "001",
    "username":"Larry",
    "userId":"004",
    "userAvatar":"http://dropdev.com/avatar/004",
    "emojiUni": "1f600",
    "title": "Today's event in LT7 is sooooo boring!",
    "votes": 4,
    "distance": 1560,
    "time": "2016-08-23T18:25:43.511Z",
    "replies": 10
  },
]

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
  <div className="row center-xs">
    <div className="col-xs-12 ">
    <Tabs>
      <Tab label="Top Drops" >
        <List feed={data} />
      </Tab>
      <Tab label="Top Comments" >
        <div><h2>Tab two</h2><p>This isasdfa asdfasdf a an example tab.</p><p>You can put any sort of HTML or react component in here. It even keeps the component state!</p></div>
      </Tab>
    </Tabs>
    </div>

    </div>
  </div>
);

export default ProfileStats;
