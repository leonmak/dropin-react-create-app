var FEEDS_SOCKET = "feeds";
var COMMENTS_SOCKET = "comments";
var VOTES_SOCKET = "votes";

/*
To Use:
setup(type, data, handler): put in componentDidMount
	type: from the constant above
	data: every thing to defined the component (comment needs postId, Feed needs nothing, Vote needs commentId)
	handler: callback(data). data has the form
		for COMMENTS_SOCKET: {userId: data.userId, text: data.text}
		for FEEDS_SOCKET: {userId: data.userId, postId: data.postId, text: data.text}
		for VOTES_SOCKET: {userId: data.userId, postId: data.postId, voteType: data.voteType}

comment(userId, postId, text): for comment
post(userId, text): for post feed
vote(userId, postId, voteType): for vote 
*/

export default class SocketHandler {
	setup(type, data, handler) {
		this.type = type;
		this.handler = handler;
		switch (type) {
			case COMMENTS_SOCKET:
				this.channelId = "comment:" + data.postId;
				break;
			case FEEDS_SOCKET:
				this.channelId = "feed:";
				break;
			case VOTES_SOCKET:
				this.channelId = "vote:" + data.commentId;
				break;
			default:
				break;
		}
		console.log(this.channelId);
    socket.on('server:sendEvent', this._eventHandler.bind(this));
	}

	_eventHandler(packet) {
		console.log("received event");
		if (packet.channelId === this.channelId) {
			this.handler(packet.data);
		}
	}

	_packSocket(data) {
		switch (this.type) {
			case COMMENTS_SOCKET:
		    return {channelId: this.channelId, event: "comment:send", data: {userId: data.userId, postId: data.postId, text: data.text}};
		  case FEEDS_SOCKET:
		    return {channelId: this.channelId, event: "feed:send", data: {userId: data.userId, text: data.text}};
		  case VOTES_SOCKET:
		    return {channelId: this.channelId, event: "vote:send", data: {userId: data.userId, postId: data.postId, voteType: data.voteType}};
		  default:
		  	return {channelId: this.channelId, event: "error", data: {}}; 
		}
	}

	comment(userId, postId, text) {
		console.log("sended comment");
    socket.emit('client:sendEvent', this._packSocket({userId, postId, text}));
	}

	post(userId, text) {
		console.log("sended post");
		socket.emit('client:sendEvent', this._packSocket({userId, text}));
	}

	vote(userId, postId, voteType) {
		console.log("sended vote");
		socket.emit('client:sendEvent', this._packSocket({userId, postId, voteType}));
	}
}