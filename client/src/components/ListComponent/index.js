import React, {Component, PropTypes} from 'react';
import {List} from './List';
import SocketHandler, {FEEDS_SOCKET, OPEN_COMMENTS_SOCKET, OPEN_VOTES_SOCKET} from '../../SocketHandler';
import * as geo from '../../utils/geolocator';

class ListComponent extends Component {


  constructor(props){
    super(props);

    this.socketHandler = new SocketHandler();
    this.commentSocketHandler = new SocketHandler();
    this.voteSocketHandler = new SocketHandler();
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

  componentDidMount() {
    this.socketHandler.setup(FEEDS_SOCKET, {}, this.newDropAdded.bind(this));

    this.commentSocketHandler.setup(OPEN_COMMENTS_SOCKET, {}, this.newCommentAdded.bind(this));

    this.voteSocketHandler.setup(OPEN_VOTES_SOCKET,{},this.newVoteAdded.bind(this));

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
    console.log('receivedcomment', data);
    this.props.updateCommentInListPage(data);
  }

  newVoteAdded(data){
    //console.log('receivedvote', data);
    //need to change state of the thing if it is wrong
    if(this.props.user){
      if(data.user_id===this.props.user.userId){
        //console.log('up my vote');
        this.props.updateMyVoteInListPage(data);
      }else{
        //console.log('up others vote');
        this.props.updateOthersVoteInListPage(data);
      }
    }else{
      //console.log('up others vote');
      this.props.updateOthersVoteInListPage(data);
    }
  }

  componentWillUnmount() {
    this.socketHandler.uninstall();
    this.commentSocketHandler.uninstall();
    this.voteSocketHandler.uninstall();
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
      passSnackbarMessage={this.props.passSnackbarMessage}
      makeAVote={this.props.makeAVote}
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
  updateMyVoteInListPage: PropTypes.func.isRequired,
  updateOthersVoteInListPage: PropTypes.func.isRequired,
  selectedDropIdx: PropTypes.func.isRequired,
  passSnackbarMessage: PropTypes.func.isRequired,
  makeAVote: PropTypes.func.isRequired
}


export default ListComponent;
