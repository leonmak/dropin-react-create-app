import React, {Component, PropTypes} from 'react';
import {List} from './List';
import SocketHandler, {FEEDS_SOCKET} from '../../SocketHandler';

//dummy data
// location is [lng, lat]
var data = [
{
  "dropId": "001",
  "username":"Anon",
  "userId":"-1",
  "userAvatarId":"ANONID",
  "emojiUni": "1f600",
  "title": "Today's event in LT7 is sooooo boring!",
  "votes": 4,
  "location": [103.7732086, 1.3067225],
  "videoUrl": "https://www.youtube.com/watch?v=tntOCGkgt98",
  "date": "2016-08-23T18:25:43.511Z",
  "replies": 10
},
{
 "dropId": "002",
 "username":"Kai Yi",
 "userId":"003",
 "userAvatarId":"drop/003idasdf",
 "emojiUni": "1f601",
 "title": "Who else is angry at the guy who just cut our queue at the drink store!",
 "imageId":"drop/krgnkzb3ie4uiwgdlpxb",
 "votes": 10,
 "location": [103.773379, 1.2970880],
 "date": "2016-09-06T12:45:43.511Z",
 "replies": 5
},
{
 "dropId": "003",
 "username":"Leon",
 "userId":"002",
 "userAvatarId":"drop/002idasdf",
 "imageId": "drop/gmzf4d8vbyxc50wefkap",
 "emojiUni": "1f602",
 "title": "To the cute guy studying outside the LT, WOWOW",
 "votes": 6,
 "location": [103.7730933, 1.3056169],
 "date": "2016-09-08T11:06:43.511Z",
 "replies": 12
},
{
 "dropId": "004",
 "username":"Thanh",
 "userId":"001",
 "userAvatarId":"drop/001idasdf",
 "soundCloudUrl": "https://soundcloud.com/dirtwire/belton-sutherland-vs-haywyre",
 "emojiUni": "1f603",
 "title": "We dont drink and derive LOL",
 "votes": 15,
 "location": [103.7732217, 1.3056169],
 "date": "2016-09-08T11:06:43.511Z",
 "replies": 10
}
];

const geoListener = (cb) => {
  return navigator.geolocation.watchPosition(
    ({ coords, timestamp }) => cb(coords),
    (err) => console.log('Unable to find position - ' + err.message),
    { enableHighAccuracy: true, timeout: 15000 }
  )
}

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

  socketHandler = new SocketHandler();

  constructor(props){
    super(props);

    this.geoId = null;
  }

  updateLocation(coords) {
    this.props.setLocation([coords.longitude, coords.latitude]);
  }

  componentDidMount() {
    //listening to the socket so that you
    //can update in real time when a new drop is posted
    this.socketHandler.setup(FEEDS_SOCKET, {}, this.newDropAdded.bind(this));

    //method to fetch all nearby drops and set the state
    this.props.fetchAllNearbyDrops();

    this.geoId = geoListener(this.updateLocation.bind(this));
    /*request.get('api/feeds/1/comments').end(function(err,res){
      console.log(res);
    });*/
  }

  //when receive the callback that a new drop has been added nearby, update the state
  //state is updated by sending an action to redux
  newDropAdded(data){
    console.log('received drop', data);
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
        feed={this.props.drops.drops}
        userLocation={this.props.location}
        passingFromOthersToDrop={this.props.passingFromOthersToDrop}
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
