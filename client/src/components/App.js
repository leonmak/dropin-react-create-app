import React, { PropTypes } from 'react';
import {BottomBar} from './BottomBar';

const App = (props) => {
	return (
		<div>
		<div>{props.children}</div>
		<div id="footer"><BottomBar /></div>
		</div>
		);
	}

	App.propTypes = {
		children: PropTypes.element
	};

	export default App;
