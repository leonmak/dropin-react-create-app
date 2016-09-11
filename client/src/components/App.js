import React, { PropTypes } from 'react';
import {BottomBar} from './BottomBar';
import {TopBar} from './TopBar';
import Headroom from 'react-headroom';

const App = (props) => {
	return (
	<div id="holder">
		<Headroom><TopBar/></Headroom>
  		<div id="body">{props.children}</div>
  		<footer><BottomBar url={props.location.pathname} /></footer>
  	</div>
	);
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
};

export default App;
