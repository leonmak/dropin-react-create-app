import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import AboutPage from './components/AboutPage';
import AddPage from './containers/AddPage';
import MapPage from './components/MapPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';
import ListPage from './containers/ListPage';
import DropPage from './containers/DropPage';
import SettingsPage from './containers/SettingsPage';
import LoginPage from './containers/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListPage}/>
    <Route path="drops">
      <IndexRoute component={ListPage}/>
      <Route path=":dropId" component={DropPage}/>
    </Route>
    <Route path="map" component={MapPage}/>
    <Route path="profile">
      <IndexRoute component={ProfilePage}/>
      <Route path=":profileId" component={ProfilePage}/>
    </Route>
    <Route path="add" component={AddPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="settings" component={SettingsPage} />
    <Route path="login" component={LoginPage} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
