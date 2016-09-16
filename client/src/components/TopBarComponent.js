import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

import '../styles/TopBar.css'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {browserHistory} from 'react-router';


function handleTouchTap(state) {
	alert('onTouchTap triggered on the title component');
	console.log(state);
}

class TopBarComponent extends Component {
	render(){
		return(
			<AppBar
			title={<span id="title">drop</span>}
			onTitleTouchTap={handleTouchTap}
			iconElementLeft={<IconButton><NavigationClose/></IconButton>}
			showMenuIconButton={this.props.pageVisibility.topBarBackButtonVisibility}
			/>
			)
	}
}

TopBarComponent.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBarComponent;
