import React, { Component } from 'react';

import * as Icons from '../../utils/Icons';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import '../../styles/ListItem.css'

var VotingBox = React.createClass({
	render: function(){
		return(
			<div>
			<FlatButton icon={Icons.MUI('keyboard_arrow_up')} onClick={this.props.upvote}/>
			<p>{this.props.votes}</p>
			<FlatButton
			icon={Icons.MUI('keyboard_arrow_down')}
			/>
			</div>
		);
	}
});


export class ListItem extends Component{

	render(){
		return(

			<Paper id="top-container" zDepth={1}>

			<p className="center-text">&#x1f601;</p>

			<p className="center-text">{this.props.title}</p>

			<div id="inner-container">

			<div id="replies-container">
			<p id="replies">{Icons.MUI('chat')}{this.props.replies} replies</p>
			<p id="distance">{Icons.MUI('place')}{this.props.distance} from you</p>
			</div>

			<VotingBox id="votes-container" votes={this.props.votes}/>

			</div>

			<div className="button-div">
			<RaisedButton
			label="Drop in"
			primary={true}
			fullWidth={true} />
			</div>

			</Paper>

			);
	}
}
