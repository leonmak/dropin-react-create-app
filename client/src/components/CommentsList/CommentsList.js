import React, { Component } from 'react';
import Comment from './Comment';


export class CommentsList extends Component {

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
          , dropId = feedItem.id

        return <Comment 
        key={idx} 
        title={title} 
        replies={replies} 
        distance={distance} 
        votes={votes} 
        date={time} 
        emojiUni={emojiUni}
        dropId={dropId}/>;
      } )}
      </div>
    );
  }

}
