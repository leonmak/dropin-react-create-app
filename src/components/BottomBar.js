import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import * as Icons from '../utils/Icons';
import '../styles/Nav.css'

export class BottomBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			idx: 0
		}
	}

  select(idx) {
    this.setState({idx})
  }

  render() {
    return (
      <Paper zDepth={1} className="bottom-navigation">
        <BottomNavigation selectedIndex={this.state.idx}>
          <BottomNavigationItem
            label="Recents"
            icon={Icons.MUI('list')}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Map"
            icon={Icons.MUI('map')}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Drop Message"
            icon={Icons.MUI('map')}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Profile"
            icon={Icons.MUI('person_pin')}
            onTouchTap={() => this.select(3)}
          />
          <BottomNavigationItem
            label="Settings"
            icon={Icons.MUI('build')}
            onTouchTap={() => this.select(4)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
