var express = require('express');
var router = express.Router();
var url = require('url');

// Authentication
var Auth = require('./middleware/Auth')
var LoginCheck = require('connect-ensure-login');
const loginCheck = LoginCheck.ensureLoggedIn('/login');
var AuthController = require('./controller/AuthController');

// API Controllers
var UsersController = require('./controller/UsersController');
var CommentsController = require('./controller/CommentsController');
var FeedsController = require('./controller/FeedsController');
var VotesController = require('./controller/VotesController');


module.exports = function (passport) {

  // Auth API
  router.post('/auth/facebook/token', AuthController.login);
  router.post('/checkSession', AuthController.checkSession);
  router.post('/logout', Auth.isLoggedIn, AuthController.logout);



  // Feeds API
  router.get('/api/feeds', FeedsController.getFeeds); // Get all the feeds
  // Example: {{base_url}}api/feeds?user_id=6

  router.get('/api/feeds/local', FeedsController.getFeedsInRadius); // Get all the feeds within a distance
  // Example: {{base_url}}api/feeds?longitude=123.212&latitude=23.33&user_id=6

  // TODO: Fix the API Call ... '4' in the example is the profile page user and the '6' is the logged-in user
  router.get('/api/users/:id/feeds', FeedsController.getUserFeeds); // Get all the feeds belonging to a user
  // Example: {{base_url}}api/users/4/feeds?longitude=123.212&latitude=23.33&user_id=6

  // TODO: Fix the API Call ... need to add the query line '6' as the logged-in user_id
  router.get('/api/feeds/:id', FeedsController.getFeed); // Get a specific feed
  // Example: {{base_url}}api/feeds/2?user_id=6

  // TODO: Add userID as the logged-in user_id
  router.post('/api/feeds', loginCheck, FeedsController.postFeed); // Create a new feed
  // Example: {{base_url}}api/feeds/ :: {userID, emoji, title, video, image, sound, longitude, latitude, date, anonymous}

  // TODO: Add userID as the logged-in user_id
  router.put('/api/feeds', loginCheck, FeedsController.editFeed); // Update an existing feed
  // Example: {{base_url}}api/feeds/ :: {postID, userID, emoji, title, video, image, sound, longitude, latitude, updated_at, anonymous}

  router.delete('/api/feeds', loginCheck, FeedsController.deleteFeed); // Delete an existing feed
  // Example: {{base_url}}api/feeds/ :: {id, userID}



  // Comments API
  router.get('/api/feeds/:id/comments', CommentsController.getFeedComments); // Get comments belonging to a feed
  // Example: {{base_url}}api/feeds/1/comments

  router.get('/api/users/:id/comments', CommentsController.getUserComments); // Get comments belonging to a user
  // Example: {{base_url}}api/users/6/comments

  router.get('/api/comments/:id', CommentsController.getComment); // Get a specific comment
  // Example: {{base_url}}api/comments/4

  router.post('/api/feeds/:id/comments', loginCheck, CommentsController.postComment); // Create a new comment for an existing feed
  // Example: {{base_url}}api/feeds/1/comments

  // router.put('/api/comments/:id', loginCheck, CommentsController.editComment); // Update an existing comment
  // Example: {{base_url}}api/comments/2

  router.delete('/api/comments/:id', loginCheck, CommentsController.deleteComment); // Delete an existing comment
  // Example: {{base_url}}api/comments/4



  // Votes API
  router.get('/api/feeds/:id/votes', VotesController.getFeedVotes); // Get votes belonging to a feed
  // Example: {{base_url}}api/feeds/5/votes?user_id=6

  router.get('/api/users/:id/votes', VotesController.getVotesToUser); // Get votes on a user
  // Example: {{base_url}}api/users/4/votes

  router.post('/api/feeds/:id/votes', loginCheck, VotesController.postVote); // Create a new vote Leave back to larry
  // {{base_url}}api/feeds/3/votes :: {user_id, post_id, vote_type}

  router.put('/api/votes', loginCheck, VotesController.editVote); // Edit an existing vote
  // {{base_url}}api/votes :: {drop_id, vote_type}

  router.delete('/api/votes', loginCheck, VotesController.deleteVote); // Delete an existing vote
  // {{base_url}}api/votes?dropId=5&userId=2



  // Profiles API
  router.get('/api/users', UsersController.getUsers); // Get all users
  // Example: {{base_url}}api/users

  router.get('/api/users/:id', UsersController.getUser); // Get a specific user
  // Example: {{base_url}}api/users/001

  router.get('/api/profile', loginCheck, (req, res) => {
    res.json(req.user);
  }); // Get session user profile
  // Example: {{base_url}}api/profile

  router.put('/api/profile', loginCheck, UsersController.editUser); // Update an existing user
  // Example: {{base_url}}api/profile :: {user_avatar_url, anonymous}

  router.delete('/api/users/:id', loginCheck, UsersController.deleteUser); // Delete an existing user
  // Example: {{base_url}}api/users/1

  return router;
}
