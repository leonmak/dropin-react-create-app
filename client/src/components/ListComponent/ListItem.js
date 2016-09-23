import React, {PropTypes} from 'react';

import * as Icons from '../../utils/Icons';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import EmojiDisplay from './EmojiDisplay';
import {Link, browserHistory} from 'react-router';

//import { CloudinaryImage } from 'react-cloudinary';
//import ReactPlayer from 'react-player';
//import SoundPlayer from '../SoundPlayer';
import geolib from 'geolib';
//import {CommentsInput} from './CommentsInput';

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

const goToURL = (props) => {
  browserHistory.push(`/drops/${props.dropId}`);
  props.selectedDropIdx(props.idx);
  props.selectedDropSrc(props.dropSrc);
  //props.fetchCommentsForDrop(props.dropId);
}

const goToEdit = props => {
  browserHistory.push('/edit/'+props.dropId);
  props.selectedDropIdx(props.idx);
};

const redirectToLogin = props =>{
  props.passSnackbarMessage('Log in to vote');
  browserHistory.push('/login');
}
/*
    title:props.title,
    replies:props.replies,
    votes:props.votes,
    time:props.time,
    emojiUni:props.emojiUni,
    dropId:props.dropId,
    location:props.location,
    userId:props.userId,
    username:props.username,
    imageId:props.imageId,
    videoUrl:props.videoUrl,
    soundCloudUrl:props.soundCloudUrl}*/

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

      {props.user?
        ((props.voted===1)?
          (<IconButton className='voted' onClick={()=>{props.makeAVote(props.dropId,1,1,props.user.userId)}}
          > {Icons.MUI('keyboard_arrow_up')}</IconButton>):
          ((props.voted===-1)?
            (<IconButton className='not-voted' onClick={()=>{props.makeAVote(props.dropId,1,-1,props.user.userId)}}
            > {Icons.MUI('keyboard_arrow_up')}</IconButton>):
            (<IconButton className='not-voted' onClick={()=>{props.makeAVote(props.dropId,1,0,props.user.userId)}}
            > {Icons.MUI('keyboard_arrow_up')}</IconButton>)
          )
        )
        :
        (<IconButton className='not-voted' onClick={()=>{redirectToLogin(props)}}
          > {Icons.MUI('keyboard_arrow_up')}</IconButton>)
      }

      </div>
      <div className="col-xs-12 votes-container">{props.votes}</div>
      <div className="col-xs-12">

      {props.user?
        ((props.voted===1)?
          (<IconButton className='not-voted' onClick={()=>{props.makeAVote(props.dropId,-1,1,props.user.userId)}}
          > {Icons.MUI('keyboard_arrow_down')}</IconButton>):
          ((props.voted===-1)?
            (<IconButton className='voted' onClick={()=>{props.makeAVote(props.dropId,-1,-1,props.user.userId)}}
            > {Icons.MUI('keyboard_arrow_down')}</IconButton>):
            (<IconButton className='not-voted' onClick={()=>{props.makeAVote(props.dropId,-1,0,props.user.userId)}}
            > {Icons.MUI('keyboard_arrow_down')}</IconButton>)
          )
        )
        :
        (<IconButton className='not-voted' onClick={()=>{redirectToLogin(props)}}
          > {Icons.MUI('keyboard_arrow_down')}</IconButton>)
      }

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
          {Icons.FAFixedWidth('map-marker')}<span>&nbsp;  <Link to={`/map#18/${props.location[1]}/${props.location[0]}/10`}>{getDistanceFromUser(props.location, props.userLocation)}km away</Link></span>
          </div>
        }
        </div>
        );
    //onTouchTap={()=>goToEdit(props)
      //console.log(props.isProfile,props.isOwnProfile,((props.isProfile)?(props.isOwnProfile):false))

    const ListItem = props => (
      <div className="row center-xs">
      <div className="col-xs-11 col-sm-4">
      <Paper className="top-container" zDepth={0}>
      <EmojiDisplay emojiUni={props.emojiUni} />
      {((props.isProfile)?(props.isOwnProfile):false) && <div className="edit-delete-btn">
      <IconButton tooltipPosition="bottom-center" tooltip="Edit" onTouchTap={()=>goToEdit(props)}>
      {Icons.MUI('mode_edit')}
      </IconButton>
      <IconButton tooltipPosition="bottom-center" tooltip="Delete" onTouchTap={()=>props.openDialog(props.dropId)} >
      {Icons.MUI('delete')}
      </IconButton>
      </div>
    }
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
    <ItemVoting votes={props.votes} user={props.user} 
    dropId={props.dropId} passSnackbarMessage={props.passSnackbarMessage}
    voted={props.voted} makeAVote={props.makeAVote} undoAVote={props.undoAVote}
    userId={props.userId}/>
    </div>
    <div className="col-xs-9">
    <ItemDetails
    time={ moment(props.date).fromNow()}
    {...props}
    />
    </div>
    </div>

        {/* Media content

        {props.isDrop && props.imageId &&
          <CloudinaryImage className="drop-image" publicId={props.imageId} options={{ height: 300, crop: 'scale' }} /> }

        {props.isDrop && props.videoUrl &&
          <ReactPlayer url={props.videoUrl} width="100%" height="auto" />}

        {props.isDrop && props.soundCloudUrl &&
        <SoundPlayer resolveUrl={props.soundCloudUrl} />}*/}

        <div className="button-div">
        {!props.isDrop && <FlatButton onTouchTap={ ()=> goToURL(props) } label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff"/> }
{/*
        <CommentsInput dropId={props.dropId}/>
      */}
      </div>

      </Paper>
      </div>
      </div>
      )

    ListItem.PropTypes = {
      passingFromOthersToDrop: PropTypes.func.isRequired,
      selectedDropIdx: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
      makeAVote: PropTypes.func.isRequired,
      undoAVote: PropTypes.func.isRequired,
      userId: PropTypes.object.isRequired,
      makeAVote: PropTypes.func.isRequired
    }

    export default ListItem;

//{title, replies, votes, time, emojiUni, dropId, location, userId, username, imageId, videoUrl, soundCloudUrl}
