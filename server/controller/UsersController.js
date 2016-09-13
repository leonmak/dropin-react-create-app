import { Users } from '../database';
const ERROR_NOT_FOUND = "Not found";

var UserController = {};

UserController.getUsers = function(req, res) {
	Users.fetchAll().then(function(users) {
		res.json(users.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

UserController.getUser = function(req, res) {
	const id = req.params.id;
	Users.where('id', id).fetch().then(function(user) {
		res.json(user.toJSON());
	}).catch(function(err) {
		res.json({error: ERROR_NOT_FOUND});
	})
}

UserController.createUser = function(access_token, profile) {
	Users.where('facebook_id', profile.id).fetch().then(function(user) {
		if (user) {
			// update access token
			user.save({
				facebook_token: access_token,
				facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null
			});
		} else {
			// create new one
			const userHash = {
				facebook_id: profile.id,
				facebook_name: profile.displayName,
				facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null,
				facebook_token: access_token
			}
			new Users().save(userHash);
		}
	});
}

module.exports = UserController;
