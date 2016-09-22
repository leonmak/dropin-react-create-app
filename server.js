const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const routesConfig = require('./server/routes');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const path = require('path');
const FacebookController = require('./server/controller/FacebookController');
const CommentsController = require('./server/controller/CommentsController');
const FeedsController = require('./server/controller/FeedsController');
var url = require('url')

// var clientSockets = [];
var cookieParser = require('cookie-parser');

const EVENT_TYPE = ['comment:send', 'feed:send']
const env = require('node-env-file');

if(process.env.NODE_ENV !== 'production')
  env(__dirname + '/.env');

passport.use(new FacebookTokenStrategy({
  clientID: process.env.REACT_APP_FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  options: {
    profileFields: ['id', 'emails', 'displayName', 'picture.type(large)', 'profileUrl', 'friends']
  }
},
FacebookController.loginCallback
));

var https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};
app.use(https_redirect);

// passport.use(new strategy({
//     clientID: process.env.FB_CLIENT_ID,
//     clientSecret: process.env.FB_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3001/facebook/auth',
//     scope: ['user_friends', 'email', 'public_profile', 'publish_actions'],
//     profileFields: ['id', 'emails', 'displayName', 'picture.type(large)', 'profileUrl', 'friends']
//   },
//   FacebookController.loginCallback
// ));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

app.set('port', (process.env.PORT || 3001));
app.use(express.static(path.join(__dirname, 'client/build')));


var session = require('express-session');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  key: 'session_id',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'https://dropins.space/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', routesConfig(passport));

io.on('connection', function(socket) {
  console.log("client connected");

  socket.on('client:sendEvent', function(packet) {

    console.log(packet);

    if (packet.event == 'comment:send') {
      CommentsController.directComment(packet.data).then(function(res) {
          var newPacket = packet;
          newPacket.data = res;
        io.emit('server:sendEvent', newPacket);
      });
    }
    if (packet.event == 'feed:send') {
        // console.log('input to feed controller', packet.data);
        FeedsController.directPost(packet.data).then(function(res) {
          var newPacket = packet;
          newPacket.data = res;
          io.emit('server:sendEvent', newPacket);
        });

      }
    })
  });

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

setInterval(function() {
    http.get("https://dropins.space");
}, 600000); // ping every 10 minutes
