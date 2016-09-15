const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require("socket.io")(http);
const routesConfig = require('./server/routes');
const passport = require('passport');
const strategy = require('passport-facebook').Strategy;
const FacebookController = require('./server/controller/FacebookController');
var clientSockets = [];

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

io.on('connection',function(socket){
  console.log("client connected");
  socket.emit('init');
  socket.on('client:initialized', function(data) {
    clientSockets.push({id: data.id, socket: socket});
  })
  for (event in eventType) {
    socket.on(eventType, function(data) {
      for (client in clientSockets) {
        if (data.id == client.id) {
          client.emit(eventType, data);
        }
      }
      if (event.substring(0, 7) == 'comment') {
        // update comment database
      }
      if (event.substring(0, 4) == 'feed') {
        // update feed database
      }
    }
  }
});

http.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
