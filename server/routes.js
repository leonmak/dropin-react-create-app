import {
  Users,
  Posts,
  Comments
} from './database';

var express = require('express');
var router = express.Router();
var LoginCheck = require('connect-ensure-login');
var UsersController = require('./controller/UsersController');
var CommentsController = require('./controller/CommentsController');
var FeedsController = require('./controller/FeedsController');
var AuthController = require('./controller/AuthController');
var Auth = require('./middleware/Auth')

const loginCheck = LoginCheck.ensureLoggedIn('/login');

module.exports = function(passport) {

  // router.get('/facebook/login',
  //   passport.authenticate('facebook'));

  // router.get('/facebook/auth',
  //   passport.authenticate('facebook', { failureRedirect: '/facebook/login' }),
  //   (req, res) => {
  //     res.redirect('/');
  //   });

  router.post('/auth/facebook/token', AuthController.login);
  router.post('/checkSession', AuthController.checkSession);
  router.post('/logout', Auth.isLoggedIn, AuthController.logout);

  // Profiles API
  router.get('/api/users', UsersController.getUsers);
  router.get('/api/users/:id', UsersController.getUser);
  router.get('/api/profile', loginCheck, (req, res) => {
    res.json(req.user);
  })

  // Feeds API
  router.get('/api/feeds', FeedsController.getFeeds);
  router.get('/api/feeds/users/:id', FeedsController.getUserFeeds);
  router.get('/api/feeds/:id', FeedsController.getFeed);
  router.post('/api/feeds', FeedsController.postFeed);

  // Comments API
  router.get('/api/comments/feeds/:id', CommentsController.getFeedComments);
  router.get('/api/comments/users/:id', CommentsController.getUserComments);
  router.get('/api/comments/feeds/:post_id/comments/:id', CommentsController.getComment);
  router.post('/api/feeds/:post_id/comments', CommentsController.postComment);

  // TODO: Votes API
  //...

  router.get('/api/profile', loginCheck, (req, res) => {
    res.json(req.user);
  })

  return router;
}


// OLD STUFF

// router.get('/api/chat', (req, res) => {
//   const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];
//   res.json(mockChats);
// });
