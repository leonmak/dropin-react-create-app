import { Posts } from '../database';
var UsersController = require('./UsersController');

const ERROR_NOT_FOUND = "Not found";

var FeedsController = {};

FeedsController.getFeeds = function(req, res) {
	Posts.fetchAll({withRelated: "user"}).then(function(posts) {
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

FeedsController.getFeed = function(req, res) {
	const id = req.params.post_id;
	Posts.where('id', id).fetch({withRelated: "user"}).then(function(post) {
		res.json(post.toJSON());
	}).catch(function(err) {
		res.json({error: ERROR_NOT_FOUND});
	})
}

// FeedsController.post = function(req, res) {
// 	UsersController.findUserId(req.user.id).then(function(user_id) {
// 		const postHash = {
// 			user_id: user_id,
// 			title: req.body.title,
// 			longitude: req.body.longitude,
// 			latitude: req.body.latitude,
// 		}
// 		new Posts().save(postHash).then(function(post) {
// 			res.json(post);
// 		}).catch(function(err) {
// 			res.json({error: err});
// 		});
// 	}).catch(function(err) {
// 		res.json({error: err});
// 	});
// }

FeedsController.directPost = function(userId, title, longitude, latitude, res = null) {
	const postHash = {
		user_id: userId,
		title: title,
		longitude: longitude,
		latitude: latitude,
	}
	new Posts().save(postHash).then(function(post) {
		if (res !== null) {
			res.json(post);
		}
	}).catch(function(err) {
		if (res !== null) {
			res.json(comment);
		}
	});
}

// {user_id:, title: , longitude: , latitude: }
FeedsController.post = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(user_id) {
		FeedsController.directPost(user_id, req.body.title, req.body.longitude, req.body.latitude)
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = FeedsController;
