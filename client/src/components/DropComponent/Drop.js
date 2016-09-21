import React, {Component} from 'react';
import ListItem from '../ListComponent/ListItem';

export class Drop extends Component {

	componentDidUpdate(prevProps,prevState){
    	console.log('drop detailed info',this.props);
    }

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
