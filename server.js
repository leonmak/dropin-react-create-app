const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const routesConfig = require('./server/routes');
const passport = require('passport');
const strategy = require('passport-facebook').Strategy;
const FacebookController = require('./server/controller/FacebookController');
var CommentsController = require('./server/controller/CommentsController');
var FeedsController = require('./server/controller/FeedsController');
// var clientSockets = [];

const EVENT_TYPE = ['comment:send', 'feed:send']

passport.use(new strategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/facebook/auth',
    scope: ['user_friends', 'email', 'public_profile', 'publish_actions'],
    profileFields: ['id', 'emails', 'displayName', 'picture.type(large)', 'profileUrl', 'friends']
  },
  FacebookController.loginCallback
));

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

app.use('/', routesConfig(passport));

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

io.on('connection',function(socket){
  console.log("client connected");

  socket.on('client:sendEvent', function(packet) {
    socket.broadcast.emit('server:sendEvent', packet);
    if (packet.event == 'comment:send') {
      CommentsController.directComment(packet.data.userId, packet.data.postId, packet.data.text);
    }
    if (packet.event == 'feed:send') {
      FeedsController.directPost(packet.data.userId, packet.data.text);      
    }
  })
  // based on feeds/ comments or ... no need
  // socket.on('client:initialized', function(packet) {
  //   clientSockets.push({channelId: packet.channelId, socket: socket});
  // });
  // for (var eventidx in EVENT_TYPE) {
  //   const event = EVENT_TYPE[eventidx];
  //   socket.on(event, function(packet) {
  //     console.log("received from socket");
  //     for (var clientidx in clientSockets) {
  //       const client = clientSockets[clientidx];
  //       console.log(client.channelId);
  //       console.log(packet.channelId);
  //       if ((packet.channelId == client.channelId) && (client.socket !== socket)) {
  //         client.socket.emit(event, packet);
  //       }
  //     }
  //     if (event == 'comment:send') {
  //       CommentsController.comment(packet.data.userId, packet.data.postId, packet.data.text);
  //       // update comment database
  //     }
  //     if (event == 'feed:send') {
  //       // update feed database
  //     }
  //   });
  // }
});

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
