import React, { Component } from 'react';

import * as Icons from '../../utils/Icons';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';

import '../../styles/ListItem.css';
import '../../styles/flexboxgrid.css';

const ItemVoting = React.createClass({
	render: function(){
		return(
			<div className="row item-voting">
        <div className="col-xs-12">
          <IconButton onClick={this.props.upvote}> {Icons.MUI('keyboard_arrow_up')}</IconButton>
        </div>
        <div className="col-xs-12 votes-container">{this.props.votes}</div>
        <div className="col-xs-12">
          <IconButton onClick={this.props.upvote}> {Icons.MUI('keyboard_arrow_down')}</IconButton>
        </div>
			</div>
			);
	}
});

const ItemDetails = React.createClass({
	render: function(){
		return(
			<div className="row item-details-container">
        <div className="col-xs-12 details">
          {Icons.FAFixedWidth('comments')}<strong>&nbsp; {this.props.replies} REPLIES</strong>
        </div>
        <div className="col-xs-12 details">
          {Icons.FAFixedWidth('map-marker')}<span>&nbsp;  {this.props.distance} away - {this.props.time}</span>
        </div>
      </div>
		);
	}
});

const ItemTitle = React.createClass({
	render: function(){
		return(
			<div className="row center-xs">
  			<div className="quote-top">
          {Icons.MUI('format_quote')}
  		  </div>
  			<div className="col-xs-10 item-title">
          {this.props.title}
  			</div>
        <div className="quote-btm">
          {Icons.MUI('format_quote')}
        </div>
			</div>
			);
	}
});


export class ListItem extends Component{

	render(){

		const time = moment(this.props.date).fromNow();

		return(
      <div className="row center-xs">
        <div className="col-xs-11 col-md-4">
          <Paper className="top-container" zDepth={0}>
            <p>&#x1f601;</p>
            <ItemTitle title={this.props.title}/>

            <div className="row middle-xs item-description">
              <div className="col-xs-1"/>
              <div className="col-xs-2">
                <ItemVoting votes={this.props.votes}/>
              </div>
              <div className="col-xs-8">
                <ItemDetails replies={this.props.replies} distance={this.props.distance} time={time}/>
              </div>
            </div>

            <div className="button-div">
              <FlatButton label="Drop in" backgroundColor="#00bcd4" hoverColor="#ffffff" />
            </div>
          </Paper>
        </div>
      </div>
    );
	}
}
