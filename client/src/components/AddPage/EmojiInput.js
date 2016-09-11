import React, {Component} from 'react';
import EmojiPicker from './EmojiPicker';
import emojiMap from './EmojiCatMap';
import TextField from 'material-ui/TextField';

// styles for the emoji picker wrapper
var emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '12rem',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em 0',
  borderBottom: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
};

class EmojiInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emoji: "",
      showEmojiPicker: false,
    }

    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.validateEmoji = this.validateEmoji.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setEmoji =  this.setEmoji.bind(this);
    this.grabKeyPress = this.grabKeyPress.bind(this);
    this.emojiPicker =  this.emojiPicker.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleEmojiPicker, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleEmojiPicker, false)
  }

  toggleEmojiPicker(e) {
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(this.validateEmoji, 10)
      this.setState({showEmojiPicker: false});
    }
  }

  validateEmoji() {
    const matched = emojiMap.filter((emoji) => {
      return `:${emoji.name}:` === this.state.emoji
    })

    if(matched.length === 0) {
      this.setState({emoji: ""})
    }
  }

  updateState(e) {
    this.setState({emoji: e.target.value})
    console.log(this.state.emoji)
  }

  setEmoji(emoji) {
    this.setState({emoji})
  }

  // allows selecting first emoji by pressing "Enter" without submitting form
  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}  />
      )
    }
  }

  render() {
    return (
      <div ref="emoji">
        <TextField
          floatingLabelText="Choose Emoji" name="emoji" id="emoji"
          value={this.state.emoji} autoComplete="off"
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState}
          onKeyDown={this.grabKeyPress} />
        {this.emojiPicker()}
      </div>
    )
  }

}

export default EmojiInput
