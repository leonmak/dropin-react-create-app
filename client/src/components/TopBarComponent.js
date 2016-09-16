import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

import '../styles/TopBar.css'
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
import * as Icons from '../utils/Icons';

function handleTouchTap(state) {
	alert('onTouchTap triggered on the title component');
	console.log(state);
}

class TopBarComponent extends Component {

	navigateBack(){
		browserHistory.goBack();
	}

	render(){

		return(
			<AppBar
			title={<span id="title">drop</span>}
			onTitleTouchTap={handleTouchTap}
			iconElementLeft={<IconButton
				onClick={this.navigateBack}>
				{Icons.MUI("keyboard_arrow_left")}
        </IconButton>}
			showMenuIconButton={this.props.pageVisibility.topBarBackButtonVisibility}
			/>
			)
	}
}

TopBarComponent.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBarComponent;
