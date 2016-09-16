import React, {Component, PropTypes} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

// import { Provider } from 'react-redux';

import * as Icons from '../../utils/Icons';
import '../../styles/Nav.css'

class BottomBarComponent extends Component {

  goToURL(url) {
    return ()=>browserHistory.push(url);
  }

  /*BottomBar.contextTypes = {

  };*/

  render() {
    const tabIdx = this.props.urlIdx;
    return (
      <div>
      { this.props.pageVisibility.bottomBarVisibility &&
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

BottomBarComponent.propTypes = {
  pageVisibility: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

export default BottomBarComponent;