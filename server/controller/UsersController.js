import { Users } from '../database';
const ERROR_NOT_FOUND = "Not found";

var UsersController = {};

UsersController.findUserId = function(facebook_id) {
	var promise = new Promise(function(resolve, reject) {
		Users.where('facebook_id', facebook_id).fetch().then(function(user) {
			resolve(user.id);
		}).catch(function(err) {
			reject(ERROR_NOT_FOUND);
		});
	})
	return promise;
}

UsersController.getUsers = function(req, res) {
	Users.fetchAll().then(function(users) {
		res.json(users.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

UsersController.getUser = function(req, res) {
	const id = req.params.id;
	Users.where('id', id).fetch().then(function(user) {
		res.json(user.toJSON());
	}).catch(function(err) {
		res.json({error: ERROR_NOT_FOUND});
	})
}

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

			}).catch(function(err) {
				res.json({error: err});
			});
		}
	});
}

module.exports = UsersController;