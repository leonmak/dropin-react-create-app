var express = require('express');
var router = express.Router();
var LoginCheck = require('connect-ensure-login');
import { Users, Posts, Comments } from './database';
var UserController = require('./controller/UsersController');

const loginCheck = LoginCheck.ensureLoggedIn('/login');

module.exports = function(passport) {

  router.get('/facebook/login',
    passport.authenticate('facebook'));

  router.get('/facebook/auth',
    passport.authenticate('facebook', { failureRedirect: '/facebook/login' }),
    (req, res) => {
      res.redirect('/');
    });

  router.get('/api/users', UserController.getUsers);

  router.get('/api/users/:id', UserController.getUser);

  router.get('/api/profile', loginCheck, (req, res) => { 
    res.json(req.user);
  })

  router.get('/api/chat', (req, res) => {

    const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];

    res.json(mockChats);
  });

  return router;
}