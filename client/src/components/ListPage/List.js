import React, { Component } from 'react';
import ListItem from './ListItem';


export class List extends Component {

  state = {
    location: [103.8198, 1.3224]
  }


  render() {
    return (
      <div style={{marginBottom: "27px"}}>
      {this.props.feed.map((feedItem,idx) => {
        let {title, replies, votes, time, emojiUni, id, distance, userId, username} = feedItem;

        return <ListItem
        userId={userId}
        username={username}
        key={idx}
        title={title}
        replies={replies}
        distance={distance}
        votes={votes}
        date={time}
        emojiUni={emojiUni}
        dropId={id}
        isProfile={this.props.isProfile}/>;
      } )}
      </div>
    );
  }

}
