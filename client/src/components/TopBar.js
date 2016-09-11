import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

import '../styles/TopBar.css'
import image from '../launcher-icon-4x.png';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

export class TopBar extends Component {
	render(){
		return(
			<AppBar
			title={<span id="title">Drop</span>}
			onTitleTouchTap={handleTouchTap}
			showMenuIconButton={false}
			/>
			)
	}
}