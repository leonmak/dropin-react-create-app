import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import '../styles/ListItem.css'

export class ListItem extends Component{

	render(){
		return(
			<div className="paper-div">

			<Paper className="main-container" zDepth={1}>

			<p id="emoji">&#x1f601;</p>

			<p id="title">{this.props.title}</p>
			
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