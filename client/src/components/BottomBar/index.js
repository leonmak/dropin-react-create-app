import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

// import { Provider } from 'react-redux';

import * as Icons from '../../utils/Icons';
import '../../styles/Nav.css'

export default class BottomBar extends Component {
	
  state = {
    showBottomBar: true
	}

  urlToIdx(url) {
    let urlFmt = url.substring(1).toLowerCase();
    // /drops -> drops
    let urlArr = urlFmt.split('/');
    const firstLvl = urlArr[0];
    if(urlArr.length > 1 && firstLvl === "drops") {
      // drops/:id have second lvl
      return -1;
    }
    switch (firstLvl) {
      case 'drops':
      return 0;
      case 'map':
      return 1;
      case 'add':
      return 2;
      case 'profile':
      return 3;
      case 'settings':
      return 4;
      default:
      return undefined;
    }
  }

  goToURL(url) {
    return ()=>browserHistory.push(url);
  }

  /*BottomBar.contextTypes = {

  };*/

  render() {
    const tabIdx = this.urlToIdx(this.props.url)
    return (
      <div>
      { tabIdx !== -1 &&
      <Paper zDepth={1} className="bottom-navigation">
      <BottomNavigation selectedIndex={tabIdx}>
      <BottomNavigationItem onTouchTap={this.goToURL('/drops')} label="Feed" icon={Icons.MUI('list')} />
      <BottomNavigationItem onTouchTap={this.goToURL('/map')} label="Map" icon={Icons.MUI('map')} />
      <BottomNavigationItem onTouchTap={this.goToURL('/add')} className="add-drop-btn" icon={Icons.FA('tint')} />
      <BottomNavigationItem onTouchTap={this.goToURL('/profile')} label="Profile" icon={Icons.MUI('person_pin')} />
      <BottomNavigationItem onTouchTap={this.goToURL('/settings')} label="Settings" icon={Icons.MUI('build')} />
      </BottomNavigation>
      </Paper>
      }
      </div>
    )
  }
}
