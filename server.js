const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const routesConfig = require('./server/routes');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookController = require('./server/controller/FacebookController');
var CommentsController = require('./server/controller/CommentsController');
var FeedsController = require('./server/controller/FeedsController');
var url = require('url')

passport.use(new FacebookTokenStrategy({
  clientID: process.env.REACT_APP_FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  options: {
    profileFields: ['id', 'emails', 'displayName', 'picture.type(large)', 'profileUrl', 'friends']
  }
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
      
    if(packet.event=='vote:send'){
      VotesController.directVote(packet.data).then(function(res){
        var newPacket = packet;
        newPacket.data = res;
        io.emit('vote:sendEvent', newPacket);
      })
    }

    })
  });

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
