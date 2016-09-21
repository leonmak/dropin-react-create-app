import React, {Component, PropTypes} from 'react';
import {List} from './List';
import SocketHandler, {FEEDS_SOCKET} from '../../SocketHandler';
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
    this.geoId = null;
  }

  updateLocation(coords) {
    this.props.setLocation([coords.longitude, coords.latitude]);
  }

  componentWillMount() {
    this.props.fetchAllNearbyDrops();
  }

  componentDidMount() {
    //listening to the socket so that you
    //can update in real time when a new drop is posted
    this.socketHandler.setup(FEEDS_SOCKET, {}, this.newDropAdded.bind(this));

    //method to fetch all nearby drops and set the state

    this.geoId = geo.geoListener(this.updateLocation.bind(this));
    /*request.get('api/feeds/1/comments').end(function(err,res){
      console.log(res);
    });*/
  }

  //when receive the callback that a new drop has been added nearby, update the state
  //state is updated by sending an action to redux
  newDropAdded(data){
    console.log('receiveddrop', data);
    this.props.updateANearbyDrop(data);
  }

  componentWillUnmount() {
    this.socketHandler.uninstall();
    navigator.geolocation.clearWatch(this.geoId);
  }

  /*<ul className="messages" ref='messages'>
        {this.props.drops.map((id,title) => {
                    //<span className='msgSender'>{msg.from}:</span>
                    return <li key={id}>{title + id}</li>
                })}
        </ul>*/

        /*<ul>
        {this.props.drops.map((drop) => {
                    //<span className='msgSender'>{msg.from}:</span>
                    return <li key={drop.id}>{drop.title + drop.id}</li>
                })}
        </ul>*/

        /*<List feed={data} userLocation={this.state.userLocation} */

  render() {
    return (
      <List
        user={this.props.user}
        feed={this.props.drops.drops}
        userLocation={this.props.location}
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
  drops: PropTypes.object.isRequired
}


export default ListComponent;
