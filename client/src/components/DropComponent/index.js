import React, {Component, PropTypes} from 'react';
import {Drop} from './Drop';
import {CommentForm} from './CommentForm';
import {CommentsList} from '../CommentsList';
import {browserHistory} from 'react-router';
import SocketHandler, {COMMENTS_SOCKET} from '../../SocketHandler';
//import {CommentsInput} from '../ListComponent/CommentsInput'

//import request from 'superagent';

//import {getSingleDropComments, getAllUsers, getAllDrops} from '../../BackendHelper'

// api call get all comments from feedId
// /api/feed/:feedId/comments

//sorted in chronological order



/*var comments = [
{
	"id":"001",
	"username":"Leon",
  "dropId": "0123adf",
	"userId":"001",
	"userAvatarId":"drop/asdf123",
	"text":"maybe you should czech the fridge",
	"createdAt": "2016-08-23T18:25:43.511Z"
},
{
	"id":"002",
	"username":"Thanh",
  "dropId": "0123adf",
	"userId":"002",
	"userAvatarId":"drop/sdfa123",
	"text":"im russian to the kitchen",
	"createdAt": "2016-08-23T18:49:43.511Z"
},
{
	"id":"003",
	"username":"Leon",
  "dropId": "0123adf",
	"userId":"001",
	"userAvatarId":"drop/asdf2",
	"text":"maybe you will find some turkey",
	"createdAt": "2016-08-23T18:51:22.664Z"
},
{
	"id":"004",
	"username":"Thanh",
  "dropId": "0123adf",
	"userId":"002",
	"userAvatarId":"drop/anonafa2341Id",
	"text":"we have some but it is covered in a layer of greece",
	"createdAt": "2016-08-23T19:01:22.664Z"
},
{
	"id":"005",
	"username":"anon",
  "dropId": "0123adf",
	"userId":"-1",
	"userAvatarId":"drop/anonId",
	"text":"i think i'll settle for some chile",
	"createdAt": "2016-08-23T19:04:22.664Z"
},
{
	"id":"006",
	"username":"anon",
  "dropId": "0123adf",
	"userId":"-1",
	"userAvatarId":"drop/anonId",
	"text":"that sounds appetizing, i would love a canada chile as well",
	"createdAt": "2016-08-23T19:04:27.664Z"
},
{
	"id":"007",
	"username":"Kai Yi",
  "dropId": "0123adf",
	"userId":"003",
	"userAvatarId":"drop/asf2341",
	"text":"denmark your name on it",
	"createdAt": "2016-08-24T00:00:35.664Z"
}
];


//not sure how to get this data from the other page, passing data around with react-router?
var drop = {
  "dropId": "001",
  "username":"Larry",
  "userId":"004",
  "userAvatarId":"as21dfa004",
  "emojiUni": "1f600", //utf-8 encoded sleepy face
  "title": "I cannot find any food today!!!",
  "videoUrl": "https://www.youtube.com/watch?v=tntOCGkgt98",
  "imageId": "drop/krgnkzb3ie4uiwgdlpxb",
  "soundCloudUrl": "https://soundcloud.com/obviouslyfake/nyan-cat-2",
  "votes": 4,
  "location": [103.7732086, 1.3067225],
  "date": "2016-08-23T18:25:43.511Z",
  "replies": 7
}
*/


const socketHandler = new SocketHandler();

class DropComponent extends Component {
  componentWillMount() {
    if(!this.props.user) {
      this.props.passSnackbarMessage('Log in to view message')
      browserHistory.push('/login');
    }
  }

	//using redux to toggle the top bar button if component mounted
	//using redux to hide bottom bar if component mounted
	componentDidMount() {
		socketHandler.setup(COMMENTS_SOCKET, {}, this.commentReceive.bind(this));
		this.props.toggleTopBarBackButton(true);
		this.props.toggleBottomBar(false);
		console.log('loc', this.props.location);
		//console.log(this.props.selectedDrop.selectedDrop);
		//this.props.fetchCommentsForDrop(this.props.selectedDrop.selectedDrop.dropId);
		/*request.get('http://localhost:3000/api/feeds').end(function(err,res){
      console.log(',',res);
    });*/
	}

	componentWillUnmount() {
		//console.log('state befor unmount', this.props.selectedDrop);
		this.props.toggleTopBarBackButton(false);
		this.props.toggleBottomBar(true);
		this.props.clearSingleDropHistory();
		//console.log('state when cleared',this.props.selectedDrop);
	}

	commentReceive(){

	}

	render() {

		return (
			<div>
			<Drop drop={this.props.selectedDrop.selectedDrop} />
			<CommentsList comments={this.props.selectedDrop.comments} />
			<CommentForm 
			location={this.props.location} 
			user={this.props.user} 
			socketHandler={socketHandler}/>
			
			
			
			</div>
			)
	}
}

/**/

/*<CommentsList comments={comments} />*/



DropComponent.propTypes = {
	toggleBottomBar: PropTypes.func.isRequired,
	toggleTopBarBackButton: PropTypes.func.isRequired,
	selectedDrop: PropTypes.object.isRequired,
	pageVisibility: PropTypes.object.isRequired,
	clearSingleDropHistory: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
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
