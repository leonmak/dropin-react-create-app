import React, {Component} from 'react';
import ListItem from '../ListPage/ListItem';

export class Drop extends Component {

	render() {
    let {title, replies, votes, time, emojiUni, id, distance, userId, username, imageId, videoId, soundCloudUrl} = this.props.drop;

		return (
		<ListItem
        userId={userId}
        username={username}
        title={title}
        replies={replies}
        distance={distance}
        votes={votes}
        date={time}
        emojiUni={emojiUni}
        dropId={id}
        isProfile={false}
        imageId={imageId}
        videoId={videoId}
        soundCloudUrl={soundCloudUrl}
        isDrop={true} />
		)
	}


}
