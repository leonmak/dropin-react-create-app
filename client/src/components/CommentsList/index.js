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
      <ScrollArea
      speed={0.8}
      className="area"
      contentClassName="content"
      horizontal={false}>
      <div>
      {this.props.comments.map(comment => {
        let {text, created_at, username, id, userId, userAvatarId} = comment;
        return <Comment
        key={id}
        text={text}
        username={username}
        userId={userId}
        userAvatar={userAvatarId}
        createdAt={created_at}
        isProfile={this.props.isProfile} />
      }
      )}
      </div>
      </ScrollArea>
      
      </div>
      );
  }

}
