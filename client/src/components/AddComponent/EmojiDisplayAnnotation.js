import React from 'react';
import ReactEmoji from 'react-emoji';

const EmojiDisplayAnnotation = React.createClass({

  mixins: [
    ReactEmoji
  ],

  render() {
    return (
      <p style={{minHeight: "94px", margin: 0}}>
        <span>{ this.emojify(this.props.emoji, {attributes: {width:'90px', height:'90px'} }) }</span>
      </p>
    );
  }
});

export default EmojiDisplayAnnotation;
