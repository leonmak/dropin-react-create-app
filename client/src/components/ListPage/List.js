import React, {Component} from 'react';
import '../../styles/List.css';
import {ListItem} from './ListItem';

export class List extends Component {

  state = {
    location: [103.8198, 1.3224]
  }


  render() {
    return (
      <div className="container">
      {this.props.feed.map((feedItem,idx) => {
        var title = feedItem.title;
        var replies = feedItem.replies;
        var distance = feedItem.distance/1000+"km";
        var votes = feedItem.votes;
        var time = feedItem.time;
        return <ListItem key={idx} title={title} replies={replies} distance={distance} votes={votes} date={time}/>;
      } )}
      </div>
    );
  }

}
