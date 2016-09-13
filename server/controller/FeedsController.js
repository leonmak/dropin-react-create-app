import { Posts } from '../database';
var UsersController = require('./UsersController');
const ERROR_NOT_FOUND = "Not found";

var FeedsController = {};

FeedsController.getFeeds = function(req, res) {
	Posts.fetchAll().then(function(posts) {
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

FeedsController.getFeed = function(req, res) {
	const id = req.params.id;
	Posts.where('id', id).fetch().then(function(posts) {
		res.json(user.toJSON());
	}).catch(function(err) {
		res.json({error: ERROR_NOT_FOUND});
	})
}

// {user_id:, title: , longitude: , latitude: }
FeedsController.post = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(user_id) {
		const postHash = {
			user_id: user_id,
			title: req.body.title,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
		}
		new Posts().save(postHash).then(function(post) {
			res.json(post);
		}).catch(function(err) {
			res.json({error: err});
		});
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = FeedsController;
