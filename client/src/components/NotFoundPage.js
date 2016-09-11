import React from 'react';
import { Link } from 'react-router';

import fallingimg from '../res/paratrooper-falling-silhouette.png';

import * as Icons from '../utils/Icons';

var divStyle = {
  margin: '40px',
};

const NotFoundPage = () => {
	return (
		<div className="row center-xs"
		style={divStyle}>
		<div className="col-xs-8">

		<img src={fallingimg} alt="404"></img>
		<h4>
		404 - You have dropped out of drop...
		</h4>

		<Link id="home-button" to="/">
		{Icons.FAFixedWidth('home')}
		</Link>

		</div>
		</div>
		);
};

export default NotFoundPage;
