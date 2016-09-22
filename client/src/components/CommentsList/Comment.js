import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import * as Icons from "../../utils/Icons";

import "../../styles/Comment.css";

const Comment = props => {
  const commentColWidth = props.isProfile ? 10 : 12;
  return (
  <div className="row center-xs">
    <div className="col-xs-11 col-md-6 comment-container">
      <div className="row middle-xs">
        <div className={`col-xs-${commentColWidth}`}>
          <div className="comment">
          <p>{props.text}</p>
          { !props.isProfile
            ? <small>by {props.userId > -1 ? <Link to={`/profile/${props.userId}`}>{props.username}</Link> : `Anonymous`} {moment(props.createdAt).fromNow()}</small>
            : <small>{moment(props.createdAt).fromNow()}</small>
          }
          </div>
        </div>
        <div className="col-xs-2">
          { props.isProfile &&
            <Link to={`/drops/${props.dropId}`}>
            <IconButton tooltip="Go to feed" touch={true} iconStyle={{color: '#808080'}}>
              {Icons.MUI('keyboard_arrow_right')}
            </IconButton>
            </Link>
          }
        </div>
      </div>
    </div>
  </div>
)
}

export default Comment;
