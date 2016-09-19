import { Users } from '../database';
var MESSAGES = require('./Messages');

var UsersController = {};

/*** Back-end Queries ***/


/*** Front-end Queries ***/

// Obtain user's User ID (Requires Login)
UsersController.findUserId = function(facebook_id) {
	var promise = new Promise(function(resolve, reject) {
		Users.where('facebook_id', facebook_id).fetch().then(function(user) {
			resolve(user.id);
		}).catch(function(err) {
			reject(MESSAGES.ERROR_AUTHENTICATION_FAILURE);
		});
	})
	return promise;
}

// Get all the users across the database
UsersController.getUsers = function(req, res) {
	Users.fetchAll().then(function(users) {
		res.json(users.toJSON());
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_USER_NOT_FOUND});
	});
}

// Get a specific user
UsersController.getUser = function(req, res) {
	const id = req.params.id;
	Users.where('id', id).fetch().then(function(user) {
		res.json(user.toJSON());
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_USER_NOT_FOUND});
	})
}

// Get a user object reference for back-end parsing and JSON object construction
UsersController.getUserObject = function(id) {
  Users.where('id', id).fetch().then(function(user) {
    return user;
  }).catch(function(err) {
    return null;
  })
}

// Creating a new user
UsersController.createUser = function(accessToken, profile) {
	Users.where('facebook_id', profile.id).fetch().then(function(user) {
		if (user) {
			// update access token
			user.save({
				facebook_token: accessToken,
				facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null
			});
		} else {
			// create new one
			const userHash = {
				facebook_id: profile.id,
				facebook_name: profile.displayName,
				facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null,
				facebook_token: accessToken
			}
			new Users().save(userHash).then(function(user) {
        console.log(user)
			}).catch(function(err) {
        console.log(err)
				// res.json({error: MESSAGES.ERROR_CREATING_USER});
			});
		}
	});
}

// TODO: Delete an existing user

module.exports = UsersController;
