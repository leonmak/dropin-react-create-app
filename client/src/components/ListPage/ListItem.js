import React from 'react';

import * as Icons from '../../utils/Icons';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import EmojiDisplay from './EmojiDisplay';
import {Link, browserHistory} from 'react-router';
import { CloudinaryImage } from 'react-cloudinary';
import ReactPlayer from 'react-player';
import SoundPlayer from '../SoundPlayer';
import geolib from 'geolib';
import {CommentsInput} from './CommentsInput';

import '../../styles/ListItem.css';
import '../../styles/flexboxgrid.css';

const getDistanceFromUser = (location, userLocation) => {
  if(userLocation && location)
    return geolib.getDistance(
      {latitude: location[1], longitude: location[0]},
      {latitude: userLocation[1], longitude: userLocation[0]}
    ) / 1000
  else
    return 0
}

const goToURL = url => setTimeout(()=>{browserHistory.push(url)}, 300);

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

    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('user')}
      <strong>&nbsp;
        {props.userId > -1
          ? <span> Posted { !props.isProfile &&
              <span>by <Link style={{color:"#808080"}} to={`profile/${props.userId}`}>{props.username}</Link> </span>}
              {props.time}</span>
          : <span> Posted by {props.username} {props.time}</span>
        }
      </strong>
    </div>
    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('comments')}<strong>&nbsp; {props.replies} REPLIES</strong>
    </div>
    {!props.isDrop && props.userLocation &&
      <div className="col-xs-12 details">
        {Icons.FAFixedWidth('map-marker')}<span>&nbsp;  {getDistanceFromUser(props.location, props.userLocation)}km away</span>
      </div>
    }
  </div>
);

const ListItem = props => (
  <div className="row center-xs">
    <div className="col-xs-11 col-sm-4">
      <Paper className="top-container" zDepth={0}>
        <EmojiDisplay emojiUni={props.emojiUni} />
        <ItemTitle title={props.title}/>
        {!props.isDrop &&
          <div className="row center-xs item-media-icon">
          {props.imageId && <div className="col-xs-2">{Icons.MUI("photo_camera")}</div>}
          {props.videoUrl && <div className="col-xs-2">{Icons.MUI("videocam")}</div>}
          {props.soundCloudUrl && <div className="col-xs-2">{Icons.MUI("music_note")}</div>}
          </div>
        }
        <div className="row center-xs middle-xs item-description">
          <div className="col-xs-2">
            <ItemVoting votes={props.votes}/>
          </div>
          <div className="col-xs-9">
            <ItemDetails
              time={ moment(props.date).fromNow()}
              {...props}
            />
          </div>
        </div>

        {/* Media content */}

        {props.isDrop && props.imageId &&
          <CloudinaryImage className="drop-image" publicId={props.imageId} options={{ height: 300, crop: 'scale' }} /> }

        {props.isDrop && props.videoUrl &&
          <ReactPlayer url={props.videoUrl} width="100%" height="auto" />}

        {props.isDrop && props.soundCloudUrl &&
          <SoundPlayer resolveUrl={props.soundCloudUrl} />}

        <div className="button-div">

        {!props.isDrop && <FlatButton onTouchTap={ ()=> goToURL(`/drops/${props.dropId}`) } label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff"/> }
  
        <CommentsInput dropId={props.dropId}/>

        </div>

      </Paper>
    </div>
  </div>
)

export default ListItem;
