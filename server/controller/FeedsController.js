import { Posts } from '../database';
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

FeedsController.post = function(req, res) {
	console.log(req);
	const postHash = {
		user_id: req.user,
		title: req.body.title,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
	}
	new Posts().save(postHash).then(function(post) {
		res.json(post);
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = FeedsController;
