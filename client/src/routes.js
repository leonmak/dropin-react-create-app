import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import AboutPage from './components/AboutPage';
import AddPage from './components/AddPage';
import MapPage from './components/MapPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';
import ListPage from './components/ListPage';
import DropPage from './components/DropPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListPage}/>
    <Route path="drop">
      <IndexRoute component={ListPage}/>
      <Route path=":dropId" component={DropPage}/>
    </Route>
    <Route path="map" component={MapPage}/>
    <Route path="profile" component={ProfilePage}/>
    <Route path="add" component={AddPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
