import React, { Component } from 'react';

import * as Icons from '../utils/Icons';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import '../styles/ListItem.css'


export class ListItem extends Component{

	render(){
		return(
			<div className="paper-div">

			<Paper zDepth={1}>

			<p id="emoji">&#x1f601;</p>

			<p id="title">{this.props.title}</p>

			<div id="container">

			<div>
			<p id="replies">{Icons.MUI('chat')}{this.props.replies} replies</p>
			<p id="distance">{Icons.MUI('place')}{this.props.distance} from you</p>
			</div>
			
			<div id="votes">
			<FlatButton icon={Icons.MUI('keyboard_arrow_up')} onClick={this.props.upvote}/>
			<p id="votes_text">{this.props.votes}</p>
			<FlatButton
			icon={Icons.MUI('keyboard_arrow_down')}
			/>
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
			);
	}
}