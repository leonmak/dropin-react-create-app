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
        // let {title, replies, votes, time, emojiUni, dropId, location, userId, username, imageId, videoUrl, soundCloudUrl} = feedItem;

        return <ListItem
          {...feedItem}
          key={idx}
          isProfile={this.props.isProfile}
          userLocation={this.props.userLocation}
          isDrop={false}
          />;
      } )}
      </div>
    );
  }

}
