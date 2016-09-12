import React, { Component } from 'react';

var socket = io.connect("http://localhost:3001");

export class ChatPage extends Component {
	getInitialState() {
		return {
			messages: [{text: "hihi"}],
		}
	}

	messageReceive(message) {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	}

	initialize() {
		// var {name} = data;
		// this.setState(user: name);
		console.log("init");
		socket.emit('user connected', {msg: "user connect"});		
	}

	componentDidMount() {
		socket.on('init', this.initialize)
		socket.on('send message', this.messageReceive);
	}

	// handleMessageSubmit(message) {
	// 	var {messages} = this.state;
	// 	messages.push(message);
	// 	this.setState({messages});
	// 	socket.emit('send:message', message);
	// }

	sendMessage(e) {
		var message = {
			// user : this.props.user,
			text : this.myTextInput
		}
		var {messages} = this.state;
		messages.push(message);
		socket.emit('send message', message);
	}

  render() {
  	return (
  		<div>
		  	<ul className="messages" ref='messages'>
  				{this.state.messages.map((msg) => {
  					//<span className='msgSender'>{msg.from}:</span> 
  					return <li>{msg.text}</li>
		  		})}
		  	</ul>
  			<form className="form" ref='form'>
  				<input autoComplete="off" className='msg' placeholder='message' ref={(ref) => this.myTextInput = ref}  />
  				<button onClick={this.sendMessage}>Send</button>
  			</form>
  		</div>
  	);
  }

}