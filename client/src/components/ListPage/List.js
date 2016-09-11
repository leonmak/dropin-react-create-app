import React, { Component } from 'react';
import ListItem from './ListItem';

export class List extends Component {

  state = {
    location: [103.8198, 1.3224]
  }


  render() {
    return (
      <div>
      {this.props.feed.map((feedItem,idx) => {
        var title = feedItem.title
          , replies = feedItem.replies
          , distance = feedItem.distance/1000+" km"
          , votes = feedItem.votes
          , time = feedItem.time
          , emojiUni = feedItem.emojiUni

        return <ListItem key={idx} title={title} replies={replies} distance={distance} votes={votes} date={time} emojiUni={emojiUni}/>;
      } )}
      </div>
    );
  }

}
