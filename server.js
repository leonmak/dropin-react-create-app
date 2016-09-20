const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const routesConfig = require('./server/routes');
const passport = require('passport');
// const strategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookController = require('./server/controller/FacebookController');
var CommentsController = require('./server/controller/CommentsController');
var FeedsController = require('./server/controller/FeedsController');
// var clientSockets = [];
var cookieParser = require('cookie-parser');

const EVENT_TYPE = ['comment:send', 'feed:send']

passport.use(new FacebookTokenStrategy({
    clientID: process.env.REACT_APP_FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    options: {
      profileFields: ['id', 'emails', 'displayName', 'picture.type(large)', 'profileUrl', 'friends']
    }
  },
  FacebookController.loginCallback
));

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

app.set('port', (process.env.API_PORT || 3001));

var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);

// var options = {
//     host: process.env.MYSQL_HOST || 'localhost',
//     port: process.env.MYSQL_PORT || 3306,
//     user: process.env.MYSQL_USER || 'root',
//     password: process.env.MYSQL_PASSWORD || 'password',
//     database: 'dropin',
// };

// var sessionStore = new MySQLStore(options);

// app.use(require('cookie-parser')());
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
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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
        CommentsController.directComment(packet.data.userId, packet.data.postId, packet.data.text);
        io.emit('server:sendEvent', packet);
      }
      if (packet.event == 'feed:send') {
        //feedscontroller needs to return an id for me to work with
        FeedsController.directPost(packet.data).then(function(res){
          var newPacket = packet;
          newPacket.data = res;
          io.emit('server:sendEvent', newPacket);
        });

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
