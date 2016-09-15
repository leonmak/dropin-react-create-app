import React, { Component } from 'react';
import Comment from './Comment';




export class CommentsList extends Component {

  state = {
    location: [103.8198, 1.3224]
  }

  render() {


    return (
      <div>
      {this.props.comments.map(comment => {
        let {text, createdAt, username, id, userId, userAvatar} = comment;
        return <Comment
        key={id}
        text={text}
        username={username}
        userId={userId}
        userAvatar={userAvatar}
        createdAt={createdAt}
        isProfile={this.props.isProfile} />
      }
      )}
      
      </div>
      );
  }

}
