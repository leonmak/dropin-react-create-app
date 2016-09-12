import React from 'react';
import ReactEmoji from 'react-emoji';

const EmojiDisplayAnnotation = React.createClass({

  mixins: [
    ReactEmoji
  ],

  render() {
    return (
      <p>
        <span>{ this.emojify(this.props.emoji, {attributes: {width:'30px', height:'30px'} }) }</span>
      </p>
    );
  }
});

export default EmojiDisplayAnnotation;
