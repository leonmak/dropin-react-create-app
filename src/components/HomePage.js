import React, { Component } from 'react';
import ons from 'onsenui';
import { Page, Tabbar, Tab, Navigator} from 'react-onsenui';

import Dialogs from './Dialogs';
import Forms from './Forms';
import AnimationsPage from './AnimationsPage';

class Tabs extends Component {

  renderTabs() {
    return [
      {
        content: <Dialogs navigator={this.props.navigator} />,
        tab: <Tab label="Dialogs" icon="ion-ios-albums-outline" />
      },
      {
        content: <Forms />,
        tab: <Tab label="Forms" icon="ion-edit" />
      },
      {
        content: <AnimationsPage navigator={this.props.navigator} />,
        tab: <Tab label="Animations" icon="ion-film-marker" />
      }
    ];
  }

  render() {
    return (
      <Page>
        <Tabbar
          renderTabs={this.renderTabs.bind(this)}
        />
      </Page>
    );
  }
}

class HomePage extends Component {

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{title: 'First page', comp: Tabs}}
        renderPage={this.renderPage.bind(this)}
      />
    );
  }
}

export default HomePage;
