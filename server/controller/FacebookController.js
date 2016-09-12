var UserController = require('./UsersController');
var FacebookController = {};

FacebookController.loginCallback = function(accessToken, refreshToken, profile, callback) {
	UserController.createUser(accessToken, profile);
	return callback(null, profile);
}

module.exports = FacebookController;