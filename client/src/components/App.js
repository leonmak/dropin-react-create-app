import React, { PropTypes } from 'react';
import {BottomBar} from './BottomBar';
import {TopBar} from './TopBar';
import Headroom from 'react-headroom';
import { RouteTransition } from 'react-router-transition';


//better react routing here, but need logic
/*atEnter={{ translateX: 100 }}
		atLeave={{ translateX: -100 }}
		atActive={{ translateX: 0 }}
		mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}*/

const App = (props) => {
	return (
		<div id="holder">

		<Headroom><TopBar/></Headroom>

		<div id="body">
		<RouteTransition
		pathname={props.location.pathname}
		atEnter={{ opacity: 0 }}
		atLeave={{ opacity: 0 }}
		atActive={{ opacity: 1 }}
		>
		{props.children}
		</RouteTransition>
		</div>

		<footer><BottomBar url={props.location.pathname} /></footer>

		</div>
		);
}

App.propTypes = {
	children: PropTypes.element,
	location: PropTypes.object
};

export default App;
