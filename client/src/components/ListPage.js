import React, { Component } from 'react';
import '../styles/List.css';
import {ListItem} from './ListItem';

//dummy data
//changed location from [1.2970879,103.773379] [lat,lng] to distance from you in meters
var data = [
{
	"id": "001",
        "emoticon": "F09F98AA", //utf-8 encoded sleepy face
        "title": "Today's event in LT7 is sooooo boring!",
        "votes": 4,
        "distance": 1560,
        "time": "2016-08-23T18:25:43.511Z",
        "replies": 10
    },
    {
    	"id": "002",
    	"emoticon": "F09F98A1",
    	"title": "Who else is angry at the guy who just cut our queue at the drink store!",
    	"votes": 10,
    	"distance": 10876,
    	"time": "2016-09-06T12:45:43.511Z",
    	"replies": 5
    },
    {
    	"id": "003",
    	"emoticon": "F09F988D",
    	"title": "To the cute guy studying outside the LT, WOWOW",
    	"votes": 6,
    	"distance": 9887,
    	"time": "2016-09-08T11:06:43.511Z",
    	"replies": 12
    },
    {
    	"id": "004",
    	"emoticon": "F09F98B9",
    	"title": "We dont drink and derive LOL",
    	"votes": 15,
    	"distance": 765,
    	"time": "2016-09-08T11:06:43.511Z",
    	"replies": 10
    }
    ];

    class ListPage extends Component {

    	state = {
    		location: [103.8198, 1.3224]
    	}


    	render() {

    		var feed = [];

    		for(var i=0;i<data.length;i++){
    			var title = data[i].title;
    			var replies = data[i].replies;
    			var distance = data[i].distance/1000+"km";
    			var votes = data[i].votes;
                var key = data[i].id;
    			feed.push(<ListItem key={key} title={title} replies={replies} distance={distance} votes={votes}/>);
    		}

    		return (
    			<div className="container">
    			{feed}
    			</div>
    			);
    	}

    }

    export default ListPage;
