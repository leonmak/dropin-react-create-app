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

    this.state ={
      directLinkDrop: null
    }

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

	//algo to initialize the comment socket // expensive deep comparison

	// componentDidUpdate(prevProps,prevState){
	// 	if(
	// 		(JSON.stringify(prevProps.selectedDrop) == JSON.stringify({
	// 		selectedDrop:{},
	// 		comments:[]
	// 		})) &&
	// 		(JSON.stringify(this.props.selectedDrop) != JSON.stringify({
	// 		selectedDrop:{},
	// 		comments:[]
	// 		}))
	// 	){
	// 		socketHandler.setup(COMMENTS_SOCKET,
	// 			{postId: this.props.selectedDrop.selectedDrop.dropId},
	// 			this.commentReceive.bind(this));
	// 	}
	// }

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
        this.setState({directLinkDrop: res.body})
        console.log(res.body)
        socketHandler.setup(COMMENTS_SOCKET, {postId: res.body.dropId}, this.commentReceive.bind(this));
      })
	}

	componentWillUnmount() {
		socketHandler.uninstall();
		navigator.geolocation.clearWatch(this.geoId);
		this.props.toggleTopBarBackButton(false);
		this.props.toggleBottomBar(true);
	}

	commentReceive(data){
		console.log('received comment', data);
		this.props.updateAComment(data);
    	//this.props.updateANearbyDrop(data);
	}

	render() {
		const {location, user, drops, profileDrops, selectedDrop} = this.props;
    const {directLinkDrop} = this.state;
    const resolvedDrop = this.clickedDrop || directLinkDrop;

		return (resolvedDrop ?
			<div>
			<Drop drop={resolvedDrop} />
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

/**/

/*			<Drop drop={this.props.selectedDrop.selectedDrop} />
			<CommentsList className='commentsContainer'
			comments={this.props.selectedDrop.comments} />
			<footer>
			<CommentForm
			location={location}
			user={user}
			socketHandler={socketHandler}
			drop={this.props.selectedDrop.selectedDrop}/>
			</footer>*/

			/*<CommentsList comments={comments} />*/



			DropComponent.propTypes = {
				toggleBottomBar: PropTypes.func.isRequired,
				toggleTopBarBackButton: PropTypes.func.isRequired,
				selectedDrop: PropTypes.object.isRequired,
				pageVisibility: PropTypes.object.isRequired,
				setLocation: PropTypes.func.isRequired,
				updateAComment: PropTypes.func.isRequired
			};


			export default DropComponent;


/*
<button type="button" onClick={()=>this.props.toggleTopBarBackButton(false)}>show bottom bar</button>
			<button type="button" onClick={()=>this.props.toggleTopBarBackButton(true)}>show bottom bar</button>
			<button type="button" onClick={()=>console.log(this.props)}>see state</button>*/

/*const DropComponent = (props) => (
	<div>
	<Drop drop={drop} />
	<CommentsList comments={comments} />
	</div>
	)

	export default DropComponent;*/
