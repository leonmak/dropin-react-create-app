const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

import { Users, Posts, Comments } from './database';

passport.use(new Strategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/facebook/auth'
  },
  function(accessToken, refreshToken, profile, callback) {
    return callback(null, profile);
  }));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

app.set('port', (process.env.API_PORT || 3001));

// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/facebook/login',
  passport.authenticate('facebook'));

app.get('/facebook/auth',
  passport.authenticate('facebook', { failureRedirect: '/facebook/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/api/users', (req, res) => {

  Users.fetchAll().then(function(user) {
    res.json(user.toJSON());
  }).catch(function(err) {
    res.json({error: err});
    console.error(err);
  });
});

app.get('/api/user', 
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => { 
    res.json(req.user);
});

app.get('/api/chat', (req, res) => {

  const mockChats = [{title:"HI", replies:"HO"}, {title:"Hey", replies:"Ha"}, {title:"He", replies:"Ha"} ];

  res.json(mockChats);
});

io.on('connection',function(socket){
  socket.on('get msg',function(data){
    var data_client=data;
    io.emit('set msg',JSON.stringify(data_client));
  });
});

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
