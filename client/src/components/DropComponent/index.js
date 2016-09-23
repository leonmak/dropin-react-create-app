import React, {Component, PropTypes} from 'react';
import {Drop} from './Drop';
import {CommentForm} from './CommentForm';
import {CommentsList} from '../CommentsList';
import {browserHistory} from 'react-router';
import SocketHandler, {COMMENTS_SOCKET, VOTES_SOCKET} from '../../SocketHandler';
import CircularProgress from 'material-ui/CircularProgress';
import request from 'superagent'

import '../../styles/Drop.css';

function geoListener(callback) {
	return navigator.geolocation.watchPosition(
		({ coords, timestamp }) => callback(coords),
		(err) => console.log('Unable to find position - ' + err.message),
		{
			enableHighAccuracy: true,
			timeout: 15000
		}
		)
}

const socketHandler = new SocketHandler();
const voteSocketHandler = new SocketHandler();

class DropComponent extends Component {

	constructor(props) {
		super(props);
		this.state={
			selectedDrop:null,
			comments:[]
		}
		this.geoId = null;
		this.updateLocation = this.updateLocation.bind(this);
	}

	updateLocation(coords) {
		this.props.setLocation([coords.longitude, coords.latitude]);
	}

	componentWillMount() {
		if(!this.props.user) {
			this.props.passSnackbarMessage('Log in to view message')
			browserHistory.push('/login');
		}
		//const {drops, profileDrops, selectedDrop} = this.props;
		/*this.state.clickedDrop = selectedDrop.selectedDropSrc === "drops" ? drops[selectedDrop.selectedDropIdx]
		: selectedDrop.selectedDropSrc === "profile" ? profileDrops[selectedDrop.selectedDropIdx] : null;*/
	}

	//using redux to toggle the top bar button if component mounted
	//using redux to hide bottom bar if component mounted
	componentDidMount() {
		this.props.toggleTopBarBackButton(true);
		this.props.toggleBottomBar(false);
		request
		.get('/api/feeds/'+this.props.params.dropId)
		.end((err,res) => {
			this.props.passingFromOthersToDrop(res.body);
			socketHandler.setup(COMMENTS_SOCKET, {postId: res.body.dropId}, this.commentReceive.bind(this));
			voteSocketHandler.setup(VOTES_SOCKET, {postId: res.body.dropId}, this.voteReceive.bind(this));
			this.props.fetchCommentsForDrop(res.body.dropId);
		})		
	}


	componentWillUnmount() {
		socketHandler.uninstall();
		voteSocketHandler.uninstall();
		navigator.geolocation.clearWatch(this.geoId);
		this.props.toggleTopBarBackButton(false);
		this.props.toggleBottomBar(true);
		this.props.clearSingleDropHistory();
	}

	commentReceive(data){
		console.log('received comment', data);
		
		//this.props.updateAComment(data);
    	//this.props.updateANearbyDrop(data);
    }

    voteReceive(data){
    	console.log('received vote', data);
		//this.props.updateAComment(data);
	}

	render() {
		//console.log("testing",(null||null));
		const {location, user, drops, profileDrops, selectedDrop} = this.props;
		const directLinkDrop = this.props.selectedDrop.selectedDrop;
		const resolvedDrop = this.state.clickedDrop || directLinkDrop;

		return (
			resolvedDrop ?
			(this.state.clickedDrop)?
			(<div>
				<Drop drop={resolvedDrop} user={this.props.user} 
				makeAVoteDropPage={this.props.makeAVote}/>
				<CommentsList comments={selectedDrop.comments} />
				<CommentForm
				location={location}
				user={user}
				socketHandler={socketHandler}
				drop={resolvedDrop}/>
				</div>)
			:(<div>
				<Drop drop={resolvedDrop} user={this.props.user} 
				makeAVoteDropPage={this.props.makeAVoteDropPage}/>
				<CommentsList comments={selectedDrop.comments} />
				<CommentForm
				location={location}
				user={user}
				socketHandler={socketHandler}
				drop={resolvedDrop}/>
				</div>
				)
			: <CircularProgress className="spinner"/>
			)
	}
}

DropComponent.propTypes = {
	toggleBottomBar: PropTypes.func.isRequired,
	toggleTopBarBackButton: PropTypes.func.isRequired,
	selectedDrop: PropTypes.object.isRequired,
	pageVisibility: PropTypes.object.isRequired,
	setLocation: PropTypes.func.isRequired,
	updateAComment: PropTypes.func.isRequired,
	passingFromOthersToDrop: PropTypes.func.isRequired,
	clearSingleDropHistory: PropTypes.func.isRequired,
	makeAVoteDropPage: PropTypes.func.isRequired,
	updateMyVoteInDropPage: PropTypes.func.isRequired,
	updateOthersVoteInDropPage: PropTypes.func.isRequired,
	makeAVoteDropPageSrcList: PropTypes.func.isRequired,
	makeAVote:PropTypes.func.isRequired
};

export default DropComponent;
