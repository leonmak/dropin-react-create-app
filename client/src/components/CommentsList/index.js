import React, { Component } from 'react';
import Comment from './Comment';

import { toggleBottomBarVisibility } from '../../actions'


export class CommentsList extends Component {

  state = {
    location: [103.8198, 1.3224]
  }

  //{this.store}.dispatch(toggleBottomBarVisibility(true));


  render() {

    /*const store=this.context;
    console.log(store);*/


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
