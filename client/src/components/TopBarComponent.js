import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

import '../styles/TopBar.css'
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
import * as Icons from '../utils/Icons';
import classNames from 'classnames';

function handleTouchTap(state) {
	browserHistory.push('/');
}

class TopBarComponent extends Component {

	navigateBack(){
		browserHistory.goBack();
	}

	render(){
    const appClass = classNames({
      'back-btn': this.props.pageVisibility.topBarBackButtonVisibility,
      'app-bar': true,
    });

		return(
			<AppBar
        className={appClass}
  			title={<span id="app-title">Drop</span>}
        style={{textAlign:"center"}}
  			onTitleTouchTap={handleTouchTap}
  			iconElementLeft={<IconButton
  				onClick={this.navigateBack}>
  				{Icons.MUI("arrow_back")}
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
