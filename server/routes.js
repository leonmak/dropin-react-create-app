var express = require('express');
var router = express.Router();
var LoginCheck = require('connect-ensure-login');
import { Users, Posts, Comments } from './database';
var UsersController = require('./controller/UsersController');
var CommentsController = require('./controller/CommentsController');
var FeedsController = require('./controller/FeedsController');

const loginCheck = LoginCheck.ensureLoggedIn('/login');

module.exports = function(passport) {

  router.get('/facebook/login',
    passport.authenticate('facebook'));

  router.get('/facebook/auth',
    passport.authenticate('facebook', { failureRedirect: '/facebook/login' }),
    (req, res) => {
      res.redirect('/');
    });

  // Users / Profiles API
  router.get('/api/users', UsersController.getUsers);
  router.get('/api/users/:id', UsersController.getUser);

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

  router.get('/api/profile', loginCheck, (req, res) => {
    res.json(req.user);
  })

  router.get('/api/chat', (req, res) => {

    const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];

    res.json(mockChats);
  });

  return router;
}
