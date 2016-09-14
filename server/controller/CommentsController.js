import { Comments, Posts } from '../database';
var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
const ERROR_NOT_FOUND = "Not found";

var CommentsController = {};

CommentsController.getComments = function(req, res) {
	const post_id = req.params.post_id;
	console.log(post_id);
	const post = Posts.where({'id': post_id});
	console.log(post.fetch({withRelated: 'comments'}));
	Posts.where('id', post_id).fetch({withRelated: 'comments'}).then(function(post) {
		res.json(post.related('comments').toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

CommentsController.getComment = function(req, res) {
	const id = req.params.id;
	const post_id =req.params.post_id;
	Posts.where({post_id: post_id, id: id}).fetch().then(function(comment) {
		res.json(comment.toJSON());
	}).catch(function(err) {
		res.json({error: ERROR_NOT_FOUND});
	})
}

CommentsController.comment = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(user_id) {
		const commentHash = {
			post_id: req.params.post_id,
			user_id: user_id,
			text: req.body.text
		}
		console.log(commentHash);
		const comment = new Comments;
		console.log(Object.getOwnPropertyNames(comment));
		new Comments().save(commentHash).then(function(comment) {
			res.json(comment);
		}).catch(function(err) {
			res.json({error: err});
		});
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = CommentsController;
