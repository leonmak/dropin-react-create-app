import React, { Component } from 'react';
import Comment from './Comment';
import ScrollArea from 'react-scrollbar';
import CircularProgress from 'material-ui/CircularProgress';

export class CommentsList extends Component {

  state = {
    location: [103.8198, 1.3224]
  }

  render() {

    return (
      <div>
      {this.props.comments.length > 0 ?
        this.props.comments.map(comment => {
          let {text, created_at, username, id, userId, userAvatarId, dropId} = comment;
          return <Comment
          key={id}
          text={text}
          dropId={dropId}
          username={username}
          userId={userId}
          userAvatar={userAvatarId}
          createdAt={created_at}
          isProfile={this.props.isProfile} />
        })
        : <CircularProgress className="spinner"/>
      }

      </div>
      );
  }

}
