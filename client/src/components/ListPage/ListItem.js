import React, { Component } from 'react';

import * as Icons from '../../utils/Icons';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
var moment = require('moment');

import '../../styles/ListItem.css';
import '../../styles/flexboxgrid.css';

var ItemVoting = React.createClass({
	render: function(){
		return(
			<div>
			<FlatButton icon={Icons.FA('angle-up')} onClick={this.props.upvote}/>
			<br></br>
			{this.props.votes}
			<br></br>
			<FlatButton icon={Icons.FA('angle-down')}/>
			</div>
			);
	}
});

var ItemDetails = React.createClass({
	render: function(){
		return(
			<div>
			<p id="replies">{Icons.FAFixedWidth('comments')}{this.props.replies} replies
			<br></br>
			{Icons.FAFixedWidth('map-marker')}{this.props.distance} from you | {this.props.time}
			</p>
			</div>
			);
	}
});

var ItemTitle = React.createClass({
	render: function(){
		return(
			<div className="row center-xs">
			<div className="col-xs-2">
			{Icons.FAFixedWidth('quote-left')}
			</div>
			<div className="col-xs-8">
			{this.props.title}
			</div>
			<div className="col-xs-2">
			{Icons.FAFixedWidth('quote-right')}
			</div>
			</div>
			);
	}
});


export class ListItem extends Component{

	render(){

		var time = moment(this.props.date).fromNow();

		return(

			<div className="row center-xs">
			<div className="col-xs-8">

			<Paper id="top-container" zDepth={1}>

			<p>&#x1f601;</p>

			<ItemTitle title={this.props.title}/>

			<div className="row between-xs">

			<div id="details-container" className="col-xs-8">
			<ItemDetails replies={this.props.replies} distance={this.props.distance} time={time}/>
			</div>

			<div className="col-xs-3">
			<ItemVoting id="votes-container" votes={this.props.votes}/>
			</div>

			</div>

			<div className="button-div">
			<RaisedButton
			label="Drop in"
			primary={true}
			fullWidth={true} />
			</div>

			</Paper>

			</div>
			</div>

			);
	}
}
