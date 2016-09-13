import React, {Component} from 'react';
import ListItem from '../ListPage/ListItem';

export class Drop extends Component {

	render() {
    let {title, replies, votes, time, emojiUni, id, distance, userId, username} = this.props.drop;

		return (
		<div className="row center-xs">
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
        isDrop={true} />
		</div>
		)
	}


}
