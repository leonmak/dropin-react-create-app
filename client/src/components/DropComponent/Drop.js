import React, {Component} from 'react';
import ListItem from '../ListPage/ListItem';

export class Drop extends Component {

	render() {
    // let {title, replies, votes, date, emojiUni, dropId, userId, username, imageId, videoUrl, soundCloudUrl} = this.props.drop;

		return (
		<ListItem
      {...this.props.drop}
      isProfile={false}
      isDrop={true} />
		)
	}


}
