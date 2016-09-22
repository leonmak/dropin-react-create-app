import React, {Component, PropTypes} from 'react';
import {List} from './List';
import SocketHandler, {FEEDS_SOCKET, OPEN_COMMENTS_SOCKET} from '../../SocketHandler';
import * as geo from '../../utils/geolocator';

/*
socket:
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

class ListComponent extends Component {


  constructor(props){
    super(props);

    this.socketHandler = new SocketHandler();
    this.commentSocketHandler = new SocketHandler();
    this.geoId = null;
  }

  updateLocation(coords) {
    this.props.setLocation([coords.longitude, coords.latitude]);
  }

  componentWillMount() {
    if(this.props.user){
      this.props.fetchAllNearbyDrops(this.props.user.userId);
    }else{
      this.props.fetchAllNearbyDrops(null);
    }
  }

  //must register all socket at the start, and dynamically register and
  //dynamically reg and dereg sockets on component change

  componentDidMount() {
    this.socketHandler.setup(FEEDS_SOCKET, {}, this.newDropAdded.bind(this));

    this.commentSocketHandler.setup(OPEN_COMMENTS_SOCKET, {}, this.newCommentAdded.bind(this));

    // TODO: method to fetch all nearby drops and set the state
    this.geoId = geo.geoListener(this.updateLocation.bind(this));


  }

  //when receive the callback that a new drop has been added nearby, update the state
  //state is updated by sending an action to redux
  newDropAdded(data){
    // console.log('receiveddrop', data);
    this.props.updateANearbyDrop(data);
  }
  newCommentAdded(data){
    // console.log('receivedcomment', data);
    this.props.updateCommentInListPage(data);
  }

  componentWillUnmount() {
    this.socketHandler.uninstall();
    this.commentSocketHandler.uninstall();
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return (
      <List
        user={this.props.user}
        feed={this.props.drops.drops}
        userLocation={this.props.location}
        dropSrc={"drops"}
        selectedDropSrc={this.props.selectedDropSrc}
        selectedDropIdx={this.props.selectedDropIdx}
        fetchCommentsForDrop={this.props.fetchCommentsForDrop}
      />
    )
  }
}

ListComponent.PropTypes = {
  fetchAllNearbyDrops: PropTypes.func.isRequired,
  updateANearbyDrop: PropTypes.func.isRequired,
  passingFromOthersToDrop: PropTypes.func.isRequired,
  drops: PropTypes.object.isRequired,
  updateCommentInListPage: PropTypes.func.isRequired,
  selectedDropIdx: PropTypes.func.isRequired
}


export default ListComponent;
