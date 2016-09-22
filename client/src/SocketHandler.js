export const FEEDS_SOCKET = "feeds";
export const COMMENTS_SOCKET = "comments";
export const VOTES_SOCKET = "votes";
export const OPEN_COMMENTS_SOCKET = "open_comments";

//import socket from 'react-socket';

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
			case OPEN_COMMENTS_SOCKET:
			this.channelId = "open_comments";
			case OPEN_VOTES_SOCKET:
			this.channelId = "open_votes";
			default:
			break;
		}
		console.log('listening to: ',this.channelId);
		socket.on('server:sendEvent', this._eventHandler.bind(this));
	}

	uninstall() {
		console.log('unlistening ',this.channelId);
		socket.removeAllListeners('server:sendEvent');
	}

	//returning the data to the server
	_eventHandler(packet) {
		console.log('sameobject1',packet);
		//console.log("received event", packet);
		if(this.channelId===OPEN_COMMENTS_SOCKET){
			this.handler(packet.data);
		}
		else if (packet.channelId === this.channelId) {
			this.handler(packet.data);
		}
	}

	_packSocket(data) {
		switch (this.type) {
			case COMMENTS_SOCKET:
			return {channelId: this.channelId, event: "comment:send", data: 
			{dropId: data.dropId,
				userId: data.userId, 
				text: data.text,
				date: data.date}};

				case FEEDS_SOCKET:
				return {channelId: this.channelId, event: "feed:send", data: 
				{userID: data.userID,
					emoji: data.emoji, 
					title: data.title,
					video: data.video,
					image: data.image,
					sound: data.sound, 
					longitude: data.longitude, 
					latitude: data.latitude,
					date: data.date}};

					case VOTES_SOCKET:
					return {channelId: this.channelId, event: "vote:send", data: 
					{userId: data.userId, 
						postId: data.postId, 
						voteType: data.voteType}};

						default:
						return {channelId: this.channelId, event: "error", data: {}}; 
					}
				}

				comment({dropId, userId, text, date}) { 
					console.log("sent new comment to server");
					socket.emit('client:sendEvent', this._packSocket({
						dropId,
						userId,
						text,
						date
					}));
				}

				post({userID, emoji, title, video, image, sound, longitude, latitude, date}) { 
					console.log("sent new post to server");
					socket.emit('client:sendEvent', this._packSocket({
						userID, 
						emoji,
						title,
						video,
						image,
						sound, 
						longitude, 
						latitude,
						date}));
				}

				vote({userId, postId, voteType}) { 
					console.log("sent new vote to server");
					socket.emit('client:sendEvent', this._packSocket({
						userId, 
						postId, 
						voteType}));
				}
			}