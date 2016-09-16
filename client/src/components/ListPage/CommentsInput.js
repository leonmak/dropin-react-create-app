import React, {Component} from 'react';
import SocketHandler from '../../SocketHandler';

var request = require('superagent');

var FEEDS_SOCKET = "feeds";
var COMMENTS_SOCKET = "comments";
var VOTES_SOCKET = "votes";

export class CommentsInput extends Component {

    socketHandler = new SocketHandler();


    constructor(props){
        super(props);
        this.state = {
          messages: []
      }
  }

  /*

    state = {
        messages: [{text: "hihi"}],
    }
    */

    componentDidMount() {
        // socket:
        this.socketHandler.setup(COMMENTS_SOCKET, {postId: this.props.dropId}, this.commentReceive.bind(this));
        request.get('/api/feeds').end(function(err,res){
            console.log(res);
        });

    }
    

    updateState(text) {
        const message = {text: text};

        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages: messages});
    }

    // when received a comment => update
    commentReceive(data) {
        this.updateState(data.text);
    }

    // when send a comment => update
    sendMessage(e) {
        e.preventDefault();

        // socket:
        this.socketHandler.comment(1, this.props.dropId, this.myTextInput.value);
        this.updateState(this.myTextInput.value);
    }

    render() {
        return (
        // Why refresh after input submit
        <div>
        <ul className="messages" ref='messages'>
        {this.state.messages.map((msg,i) => {
                    //<span className='msgSender'>{msg.from}:</span> 
                    return <li key={i}>{msg.text}</li>
                })}
        </ul>
        <form onSubmit={this.sendMessage.bind(this)}> 
        <input type="text" ref={(ref) => {this.myTextInput = ref}} />
        </form>
        </div>
        );
    }

}
