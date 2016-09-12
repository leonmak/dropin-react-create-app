import React, {Component} from 'react';
import EmojiPicker from './EmojiPicker';
import emojiMap from './EmojiCatMap';
import TextField from 'material-ui/TextField';
import EmojiDisplayAnnotation from '../EmojiDisplayAnnotation';

// styles for the emoji picker wrapper
var emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '16.13rem',
  backgroundColor: '#f2f2f2',
  width: '100%',
  borderBottom: '1px solid #00bcd4',
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
    const { input: { value, onChange } } = this.props;
    const matched = emojiMap.filter((emoji) => {
      return `:${emoji.name}:` === value
    })

    if(matched.length === 0) {
      onChange(null);
    }
  }

  updateState(onChange) {
    return e => {
      onChange(e.target.value);
    }
  }

  setEmoji(onChange) {
    return emoji => {
      onChange(emoji);
    }
  }

  // allows selecting first emoji by pressing "Enter" without submitting form
  grabKeyPress(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }

  emojiPicker() {
    const { input: { value, onChange } } = this.props

    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles}
          onSelect={this.setEmoji(onChange)}
          query={value}  />
      )
    }
  }

  // note: destructuring this.props.input.onChange to onChange
  render() {
    const { input: { value, onChange }, meta: { error, pristine } } = this.props
    return (
      <div ref="emoji">
        <EmojiDisplayAnnotation emoji={value} />
        <TextField name="emoji" id="emoji"
          floatingLabelText={this.props.hintText}
          value={value}
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState(onChange)}
          onKeyDown={this.grabKeyPress}
          errorStyle={{marginLeft: "-80%"}}
          errorText={!pristine ? error : ""} />
        {this.emojiPicker()}
      </div>
    )
  }

}

export default EmojiInput
