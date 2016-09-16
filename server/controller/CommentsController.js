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

CommentsController.directComment = function(userId, postId, text, res = null) {
	const commentHash = {
		post_id: postId,
		user_id: userId,
		text: text
	}
	const comment = new Comments;
	new Comments().save(commentHash).then(function(comment) {
		if (res !== null) {
			res.json(comment);
		}
	}).catch(function(err) {
		if (res !== null) {
			res.json({error: err});
		}
	});
}

CommentsController.comment = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(userId) {
		this.directComment(userId, req.params.post_id, req.body.text, res);
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = CommentsController;
