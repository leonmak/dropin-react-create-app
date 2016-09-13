import React from 'react';

import * as Icons from '../../utils/Icons';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import EmojiDisplay from '../EmojiDisplay';

import '../../styles/ListItem.css';
import '../../styles/flexboxgrid.css';

import {Link} from 'react-router';

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
      {Icons.FAFixedWidth('comments')}<strong>&nbsp; {props.replies} REPLIES</strong>
    </div>
    <div className="col-xs-12 details">
      {Icons.FAFixedWidth('map-marker')}<span>&nbsp;  {props.distance} away - {props.time}</span>
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

const ListItem = props => (
  <div className="row center-xs">
    <div className="col-xs-11 col-md-4">
      <Paper className="top-container" zDepth={0}>
        <EmojiDisplay emojiUni={props.emojiUni} />
        <ItemTitle title={props.title}/>

        <div className="row middle-xs item-description">
          <div className="col-xs-1"/>
          <div className="col-xs-2">
            <ItemVoting votes={props.votes}/>
          </div>
          <div className="col-xs-8">
            <ItemDetails
              replies={props.replies}
              distance={props.distance}
              time={ moment(props.date).fromNow()}/>
          </div>
        </div>

        <div className="button-div">
        <FlatButton label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff"/>
          <Link to={`/drop/${props.dropId}`}>
          <FlatButton label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff"/>
          </Link>
        </div>

      </Paper>
    </div>
  </div>
);

/*onTouchTap={()=>()}*/

export default ListItem;
