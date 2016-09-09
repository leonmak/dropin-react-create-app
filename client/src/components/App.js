import React, { PropTypes } from 'react';
import {BottomBar} from './BottomBar';

const App = (props) => {
	return (
		<div id="holder">
		<div id="body">{props.children}</div>
		<footer><BottomBar /></footer>
		</div>
		);
	}

	App.propTypes = {
		children: PropTypes.element
	};

	export default App;
