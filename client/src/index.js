import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import cloudinary from 'cloudinary';

import routes from './routes';
import configureStore from './store/configureStore';

import './index.css';
import './styles/flexboxgrid.css'
import './styles/colors.css'
import 'leaflet/dist/leaflet.css'
import 'font-awesome/css/font-awesome.css'

// Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDNIARY_CLOUDNAME,
  api_key: process.env.REACT_APP_CLOUDNIARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDNIARY_API_SECRET
});

// Needed for onTouchTap - MUI
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Redux
const store = configureStore();

// React-Redux-Router for props.location
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);
