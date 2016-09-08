import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

import * as Icons from '../utils/Icons';
import '../styles/Nav.css'

export class BottomBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			idx: 0
		}
	}

  select(idx, url) {
    this.setState({idx});
    browserHistory.push(url);
  }

  render() {
    return (
      <Paper zDepth={1} className="bottom-navigation">
        <BottomNavigation selectedIndex={this.state.idx}>
          <BottomNavigationItem
            label="Feed"
            icon={Icons.MUI('list')}
            onTouchTap={() => this.select(0, 'list')}
          />
          <BottomNavigationItem
            label="Map"
            icon={Icons.MUI('map')}
            onTouchTap={() => this.select(1, 'map')}
          />
          <BottomNavigationItem
            className="add-drop-btn"
            icon={Icons.FA('tint')}
            onTouchTap={() => this.select(2, 'add')}
          />
          <BottomNavigationItem
            label="Profile"
            icon={Icons.MUI('person_pin')}
            onTouchTap={() => this.select(3, 'profile')}
          />
          <BottomNavigationItem
            label="Settings"
            icon={Icons.MUI('build')}
            onTouchTap={() => this.select(4, 'settings')}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
