import React, {Component} from 'react';

export class CommentsInput extends Component {
    
  state = {
    messages: [{text: "hihi"}],
  }

    messageReceive(message) {
        console.log("received");
        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages: messages});
    }

    idPacket() {
        this.socketId = "comment:{0}".format(this.props.dropId);
        return {channelId: this.socketId};
    }

    initialize() {
        socket.emit('client:initialized', idPacket());       
    }

    socketPacket() {
        return {dropID: this.props.dropId, state: this.state};
    }

    componentDidMount() {
        socket.on('init', this.initialize)
        socket.on('comment:send', this.messageReceive.bind(this));
    }

    // handleMessageSubmit(message) {
    //  var {messages} = this.state;
    //  messages.push(message);
    //  this.setState({messages});
    //  socket.emit('send:message', message);
    // }

    sendMessage(e) {
        e.preventDefault();
        console.log("sended");
        console.log(this.myTextInput.value);
        var message = {
            // user : this.props.user,
            text : this.myTextInput.value
        }
        var messages = this.state.messages;
        messages.push(message);
        console.log(JSON.stringify(messages));
        socket.emit('send:message', socketPacket());
        this.setState({messages: messages});
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
