var UserController = require('./UsersController');
var FacebookController = {};
var MESSAGES = require('./Messages');

FacebookController.loginCallback = function(accessToken, refreshToken, profile, callback) {
  UserController.createUser(accessToken, profile, callback);
  // console.log("FB PROFILE: ", profile);
  // return callback(null, profile);
}

module.exports = FacebookController;
