import React, { PropTypes } from 'react';
import {BottomBar} from './BottomBar';

const App = (props) => {
	return (
		<div>
		{props.children}
		<BottomBar />
		</div>
		);
	}

	App.propTypes = {
		children: PropTypes.element
	};

	export default App;
