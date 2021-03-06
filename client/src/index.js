import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { cloudinaryConfig } from 'react-cloudinary';
import { checkSessionStatus } from './actions/AuthActions';

import routes from './routes';
import configureStore from './store/configureStore';

import './index.css';
import './styles/flexboxgrid.css'
import './styles/colors.css'
import 'leaflet/dist/leaflet.css'
import 'font-awesome/css/font-awesome.css'

// Cloudinary display img
cloudinaryConfig({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME });

// Needed for onTouchTap - MUI
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Redux
const store = configureStore();

// React-Redux-Router for props.location
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(checkSessionStatus());

/*

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
store.dispatch(toggleBottomBarVisibility(true));
store.dispatch(toggleBottomBarVisibility(false));

unsubscribe()*/
var ReactGA = require('react-ga');
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes} onUpdate={logPageView}/>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);
