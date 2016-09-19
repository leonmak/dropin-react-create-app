import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List} from '../ListComponent/List';
import {CommentsList} from '../CommentsList';

import * as fb from '../../utils/facebook-url';
import * as text from '../../utils/text';

import '../../styles/ProfilePage.css';

// TODO: fetch user's comments ordered by date
var comments = [
  {
    "id":"001",
    "username":"Leon",
    "dropId": "0123adf",
    "userId":"001",
    "userAvatarId":"drop/asdf123",
    "text":"maybe you should czech the fridge",
    "createdAt": "2016-08-23T18:25:43.511Z"
  },
  {
    "id":"002",
    "username":"Thanh",
    "dropId": "0123adf",
    "userId":"002",
    "userAvatarId":"drop/sdfa123",
    "text":"im russian to the kitchen",
    "createdAt": "2016-08-23T18:49:43.511Z"
  },
]
var drops = [
  {
   "dropId": "002",
   "username":"Kai Yi",
   "userId":"003",
   "userAvatarId":"drop/003idasdf",
   "emojiUni": "1f601",
   "title": "Who else is angry at the guy who just cut our queue at the drink store!",
   "imageId":"drop/krgnkzb3ie4uiwgdlpxb",
   "votes": 10,
   "location": [103.773379, 1.2970880],
   "date": "2016-09-06T12:45:43.511Z",
   "replies": 5
  },
  {
   "dropId": "003",
   "username":"Leon",
   "userId":"002",
   "userAvatarId":"drop/002idasdf",
   "imageId": "drop/gmzf4d8vbyxc50wefkap",
   "emojiUni": "1f602",
   "title": "To the cute guy studying outside the LT, WOWOW",
   "votes": 6,
   "location": [103.7730933, 1.3056169],
   "date": "2016-09-08T11:06:43.511Z",
   "replies": 12
  }
]
export default class ProfilePageComponent extends Component{

  componentWillMount() {
    if(!this.props.user) {
      this.props.passSnackbarMessage('Log in to view profile')
      browserHistory.push('/login');
    }
  }

	render() {
    const {user} = this.props
		return (
      <div>
      {user && <div>
      <div className="row center-xs profile-container">
        <div className="col-xs-12 profile-pic">
          <Avatar
            src={fb.profileImg(user.id, 90)}
            size={100}
          />
        </div>
        <div className="col-xs-12 profile-fb">
          <h2>{user.displayName}</h2>
          <a target="_window" href={fb.msgUrl(user.id)}>Message on Facebook</a>
        </div>
        <div className="col-xs-12 ">
          <div className="row center-xs">
            <div className="col-xs-3 profile-stat"><p>{drops.length || 0 }</p><small>{text.pluralizer('drop', drops.length)}</small></div>
            <div className="col-xs-3 profile-stat"><p>{comments.length || 0 }</p><small>{text.pluralizer('comment', comments.length)}</small></div>
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
      }
      </div>
		)
	}
}
