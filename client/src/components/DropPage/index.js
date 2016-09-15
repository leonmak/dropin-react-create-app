import React from 'react';
import {Drop} from './Drop';
import {CommentsInput} from './CommentsInput';
import {CommentsList} from '../CommentsList';


// import * as actionCreators from '../../actions';
// import { bindActionCreators } from 'redux';

/*state = {
    showBottomBar: false
}

function mapStateToProps(state) {
  return { todos: state.showBottomBar }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}*/

// api call get all comments from feedId
// /api/feed/:feedId/comments

//sorted in chronological order

var comments = [
{
	"id":"001",
	"username":"Leon",
	"userId":"001",
	"userAvatar":"http://dropdev.com/avatar/001",
	"text":"maybe you should czech the fridge",
	"createdAt": "2016-08-23T18:25:43.511Z"
},
{
	"id":"002",
	"username":"Thanh",
	"userId":"002",
	"userAvatar":"http://dropdev.com/avatar/002",
	"text":"im russian to the kitchen",
	"createdAt": "2016-08-23T18:49:43.511Z"
},
{
	"id":"003",
	"username":"Leon",
	"userId":"001",
	"userAvatar":"http://dropdev.com/avatar/001",
	"text":"maybe you will find some turkey",
	"createdAt": "2016-08-23T18:51:22.664Z"
},
{
	"id":"004",
	"username":"Thanh",
	"userId":"002",
	"userAvatar":"http://dropdev.com/avatar/002",
	"text":"we have some but it is covered in a layer of greece",
	"createdAt": "2016-08-23T19:01:22.664Z"
},
{
	"id":"005",
	"username":"anon",
	"userId":"-1",
	"userAvatar":"http://dropdev.com/avatar/anon",
	"text":"i think i'll settle for some chile",
	"createdAt": "2016-08-23T19:04:22.664Z"
},
{
	"id":"006",
	"username":"anon",
	"userId":"-1",
	"userAvatar":"http://dropdev.com/avatar/anon",
	"text":"that sounds appetizing, i would love a canada chile as well",
	"createdAt": "2016-08-23T19:04:27.664Z"
},
{
	"id":"007",
	"username":"Kai Yi",
	"userId":"003",
	"userAvatar":"http://dropdev.com/avatar/003",
	"text":"denmark your name on it",
	"createdAt": "2016-08-24T00:00:35.664Z"
}
];


//not sure how to get this data from the other page, passing data around with react-router?
var drop = {
  "id": "001",
  "username":"Larry",
  "userId":"004",
  "userAvatar":"as21dfa004",
  "emojiUni": "1f600", //utf-8 encoded sleepy face
  "title": "I cannot find any food today!!!",
  "videoId": "tntOCGkgt98",
  "imageId": "drop/krgnkzb3ie4uiwgdlpxb",
  "soundCloudUrl": "https://soundcloud.com/dirtwire/belton-sutherland-vs-haywyre",
  "votes": 4,
  "distance": 1560,
  "time": "2016-08-23T18:25:43.511Z",
  "replies": 7
}


const DropPage = (props) => (
  <div>
  	<Drop drop={drop} />
  	<CommentsInput />
    <CommentsList comments={comments} />
  </div>
)

export default DropPage;
