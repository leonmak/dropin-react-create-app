import React, { Component } from 'react';
import Comment from './Comment';
import ScrollArea from 'react-scrollbar';

export class CommentsList extends Component {

  state = {
    location: [103.8198, 1.3224]
  }

  render() {

    return (
      <div>
      { this.props.comments.map((comment,idx) => {
          let {text, created_at, username, id, userId, userAvatarId, dropId} = comment;
          return <Comment
          key={idx}
          text={text}
          dropId={dropId}
          username={username}
          userId={userId}
          userAvatar={userAvatarId}
          createdAt={created_at}
          isProfile={this.props.isProfile} />
        })
      }
      </div>
    );
  }
}
