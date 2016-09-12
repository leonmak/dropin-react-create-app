import { Users } from '../database';

var UserController = {};

UserController.getUsers = function(req, res) {
	Users.fetchAll().then(function(users) {
		res.json(users.toJSON());
	}).catch(function(err) {
		res.json({error: err});
		console.error(err);
	});
}

UserController.getUser = function(req, res) {
	id = req.id;
	Users.where('id', id).fetch().then(function(user) {
		res.json(user.toJSON());
	}).catch(function(err) {
		res.json({error: err});
		console.error(error);
	})
}

UserController.createUser = function(access_token, profile) {
	Users.where('facebook_id', profile.id).fetch().then(function(user) {
			console.log(user);
		if (user) {
			// update access token
			user.save({'facebook_token': access_token});
		} else {
			// create new one
			const userHash = {
				facebook_id: profile.id,
				facebook_name: profile.displayName,
				facebook_token: access_token
			}
			new Users().save(userHash);
		}
	});
}

module.exports = UserController;
