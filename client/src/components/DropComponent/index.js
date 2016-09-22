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

    /*this.state ={
      directLinkDrop: null
    }*/

		this.geoId = null;
    this.clickedDrop = null;
		this.updateLocation = this.updateLocation.bind(this);
	}

	updateLocation(coords) {
		this.props.setLocation([coords.longitude, coords.latitude])
	}

	componentWillMount() {
		if(!this.props.user) {
			this.props.passSnackbarMessage('Log in to view message')
			browserHistory.push('/login');
		}
    const {drops, profileDrops, selectedDrop} = this.props;

    this.clickedDrop = selectedDrop.selectedDropSrc === "drops" ? drops[selectedDrop.selectedDropIdx]
    : selectedDrop.selectedDropSrc === "profile" ? profileDrops[selectedDrop.selectedDropIdx] : null;
	}

	//using redux to toggle the top bar button if component mounted
	//using redux to hide bottom bar if component mounted
	componentDidMount() {
		// this.geoId = geoListener(this.updateLocation);
		this.props.toggleTopBarBackButton(true);
		this.props.toggleBottomBar(false);

    if(this.clickedDrop)
      socketHandler.setup(COMMENTS_SOCKET, {postId: this.clickedDrop.dropId}, this.commentReceive.bind(this));
    else
      request
      .get('/api/feeds/'+this.props.params.dropId)
      .end((err,res) => {
        //this.setState({directLinkDrop: res.body})
        this.props.passingFromOthersToDrop(res.body);

        console.log(res.body)
        socketHandler.setup(COMMENTS_SOCKET, {postId: res.body.dropId}, this.commentReceive.bind(this));
      })

    this.props.fetchCommentsForDrop(this.props.params.dropId);
	}

	componentWillUnmount() {
		socketHandler.uninstall();
		navigator.geolocation.clearWatch(this.geoId);
		this.props.toggleTopBarBackButton(false);
		this.props.toggleBottomBar(true);
		this.props.clearSingleDropHistory();
	}

	commentReceive(data){
		console.log('received comment', data);
		this.props.updateAComment(data);
    	//this.props.updateANearbyDrop(data);
	}

	render() {
		console.log("testing",(null||null));
		const {location, user, drops, profileDrops, selectedDrop} = this.props;
    const directLinkDrop = this.props.selectedDrop.selectedDrop;
    const resolvedDrop = this.clickedDrop || directLinkDrop;

		return (resolvedDrop ?
			<div>
			<Drop drop={resolvedDrop} user={this.props.user} />
			<CommentsList comments={selectedDrop.comments} />
			<CommentForm
			location={location}
			user={user}
			socketHandler={socketHandler}
			drop={resolvedDrop}/>
			</div>
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
	clearSingleDropHistory: PropTypes.func.isRequired
};

export default DropComponent;
