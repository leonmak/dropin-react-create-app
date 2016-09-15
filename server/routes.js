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

  router.get('/api/users', UsersController.getUsers);
  router.get('/api/users/:id', UsersController.getUser);

  router.get('/api/feeds', FeedsController.getFeeds);
  router.post('/api/feeds', FeedsController.post);

  router.get('/api/feeds/:post_id/comments', CommentsController.getComments);
  router.post('/api/feeds/:post_id/comments', CommentsController.commentRequest);

  router.get('/api/profile', loginCheck, (req, res) => { 
    res.json(req.user);
  })

  router.get('/api/chat', (req, res) => {

    const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];

    res.json(mockChats);
  });

  return router;
}