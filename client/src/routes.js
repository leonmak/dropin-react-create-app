import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import AboutPage from './components/AboutPage.js';
import MapPage from './components/MapPage.js';
import ProfilePage from './components/ProfilePage.js';
import NotFoundPage from './components/NotFoundPage.js';
import ListPage from './components/ListPage.js';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListPage}/>
    <Route path="list" component={ListPage}/>
    <Route path="map" component={MapPage}/>
    <Route path="profile" component={ProfilePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
