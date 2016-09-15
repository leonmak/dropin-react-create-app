import React, {Component} from 'react';

export class CommentsInput extends Component {
    
  state = {
    messages: [{text: "hihi"}],
  }

    channelId = "comment:" + this.props.dropId;

    messageReceive(packet) {
        if (packet.channelId == this.channelId) {
            console.log("received");
            const message = {text: packet.data.text};
            var messages = this.state.messages;
            messages.push(message);
            this.setState({messages: messages});
        }
    }

    idPacket() {
        return {channelId: this.channelId};
    }

    socketPacket(message) {
        // data of the form {sender (get from session), postId, text}
        return {channelId: this.channelId, event: "comment:send", data: {userId: 1, postId: this.props.dropId, text: message}};
    }

    componentDidMount() {
        socket.emit('client:initialized', this.idPacket());       
        socket.on('server:sendEvent', this.messageReceive.bind(this));
    }

    sendMessage(e) {
        e.preventDefault();
        console.log("sended");
        var message = {
            // user : this.props.user,
            text : this.myTextInput.value
        }
        var messages = this.state.messages;
        messages.push(message);
        socket.emit('client:sendEvent', this.socketPacket(message.text));
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
