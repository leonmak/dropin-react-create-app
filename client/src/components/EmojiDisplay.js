import React from 'react';
import ReactEmoji from 'react-emoji';
import EmojiUniToAnnotation from '../utils/emoji-unicode-to-annotation';

const EmojiDisplay = React.createClass({

  mixins: [
    ReactEmoji
  ],

  render() {
    return (
      <p>
        <span>{ this.emojify(`:${EmojiUniToAnnotation[this.props.emojiUni]}:`, {attributes: {width:'30px', height:'30px'} }) }</span>
      </p>
    );
  }
});

export default EmojiDisplay;
