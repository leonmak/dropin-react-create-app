var express = require('express');
var path = require('path');
var router = express.Router();
var url = require('url')


var Auth = require('./middleware/Auth')
var LoginCheck = require('connect-ensure-login');
const loginCheck = LoginCheck.ensureLoggedIn('/login');
var AuthController = require('./controller/AuthController');

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
  router.get('/api/feeds', FeedsController.getFeeds);
  router.get('/api/users/:id/feeds', FeedsController.getUserFeeds);
  router.get('/api/feeds/:id', FeedsController.getFeed);
  router.post('/api/feeds', FeedsController.postFeed);
  router.delete('/api/feeds/:id', FeedsController.deleteFeed);

  // Comments API
  router.get('/api/feeds/:id/comments', CommentsController.getFeedComments);
  router.get('/api/users/:id/comments', CommentsController.getUserComments);
  router.get('/api/comments/:id', CommentsController.getComment);
  router.post('/api/feeds/:id/comments', CommentsController.postComment);
  router.delete('/api/comments/:id', CommentsController.deleteComment);

  // Votes API
  router.get('/api/feeds/:id/votes/:user_id', VotesController.getFeedVotes);
  router.get('/api/feeds/:id/votes', VotesController.getFeedVotes);
  router.get('/api/users/:id/votes', VotesController.getVotesToUser);
  router.get('/api/votes/:id', VotesController.getVote);
  router.post('/api/feeds/:id/votes', VotesController.postVote);
  router.put('/api/votes/:id', VotesController.editVote);
  router.delete('/api/votes/:id', VotesController.deleteVote);

  // Profiles API
  router.get('/api/users', UsersController.getUsers);
  router.get('/api/users/:id', UsersController.getUser);
  router.get('/api/profile', loginCheck, (req, res) => {
    res.json(req.user);
  });
  router.put('/api/profile', loginCheck, UsersController.editUser);
  router.delete('/api/users/:id', UsersController.deleteUser);

  router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'))
  })

  return router;
}
