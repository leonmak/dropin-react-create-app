import React from 'react';

import * as Icons from '../../utils/Icons';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import EmojiDisplay from './EmojiDisplay';
import {Link, browserHistory} from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';

import '../../styles/ListItem.css';
import '../../styles/flexboxgrid.css';

const ItemVoting = (props) => (
  <div className="row item-voting">
    <div className="col-xs-12">
      <IconButton onClick={props.upvote}> {Icons.MUI('keyboard_arrow_up')}</IconButton>
    </div>
    <div className="col-xs-12 votes-container">{props.votes}</div>
    <div className="col-xs-12">
      <IconButton onClick={props.upvote}> {Icons.MUI('keyboard_arrow_down')}</IconButton>
    </div>
  </div>
);

const ItemDetails = (props) => (
  <div className="row item-details-container">
    { !props.isProfile &&
    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('user')}
      <strong>&nbsp;
        {props.userId > -1
          ? <span> Posted by: <Link style={{color:"#808080"}} to={`profile/${props.userId}`}>{props.username}</Link></span>
          : <span> Posted by: {props.username}</span>
        }
      </strong>
    </div>
    }
    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('comments')}<strong>&nbsp; {props.replies} REPLIES</strong>
    </div>
    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('map-marker')}<span>&nbsp;  {props.distance/1000}km away - {props.time}</span>
    </div>
  </div>
);

const ItemTitle = (props) => (
  <div className="row center-xs">
    <div className="quote-top">
      {Icons.MUI('format_quote')}
    </div>
    <div className="col-xs-10 item-title">
      {props.title}
    </div>
    <div className="quote-btm">
      {Icons.MUI('format_quote')}
    </div>
  </div>
);

/*function select(url) {
    this.setState({idx});
    browserHistory.push(url);
  }*/

const goToURL = url => setTimeout(()=>{browserHistory.push(url)}, 300);

const ListItem = props => (
  <div className="row center-xs">
    <div className="col-xs-11 col-sm-4">
      <Paper className="top-container" zDepth={0}>
        <EmojiDisplay emojiUni={props.emojiUni} />
        <ItemTitle title={props.title}/>
        {!props.isDrop &&
          <div className="row center-xs item-media-icon">
          {props.imageId && <div className="col-xs-2">{Icons.MUI("photo_camera")}</div>}
          {props.imageId && <div className="col-xs-2">{Icons.MUI("videocam")}</div>}
          {props.imageId && <div className="col-xs-2">{Icons.MUI("music_note")}</div>}
          </div>
        }
        <div className="row center-xs middle-xs item-description">
          <div className="col-xs-2">
            <ItemVoting votes={props.votes}/>
          </div>
          <div className="col-xs-9">
            <ItemDetails
              replies={props.replies}
              distance={props.distance}
              time={ moment(props.date).fromNow()}
              userId={props.userId}
              username={props.username}
              isProfile={props.isProfile} />
          </div>
        </div>

        {(props.isDrop && props.imageId) && <CloudinaryImage className="drop-image" publicId={props.imageId} options={{ height: 300, crop: 'scale' }} /> }

        <div className="button-div">

        {!props.isDrop && <FlatButton onTouchTap={ ()=> goToURL(`/drops/${props.dropId}`) } label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff"/> }

        </div>

      </Paper>
    </div>
  </div>
)

/*onTouchTap={()=>()}*/

export default ListItem;
