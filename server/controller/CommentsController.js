import {
  Comments,
  Posts
} from '../database';
var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
var MESSAGES = require('./Messages');

var CommentsController = {};

/*** Back-end Queries ***/

// Get comments count for a specific feed
CommentsController.getFeedCommentCount = function(post_id) {
  const post = Posts.where({
    'id': post_id
  });
  Posts.where('id', post_id).fetch({
    withRelated: 'comments'
  }).then(function(post) {
    var comments = post.related('comments');
    return comments.count();
  }).catch(function(err) {
    return 0;
  });
}


/*** Front-end Queries ***/

// Get comments from a specific feed
CommentsController.getFeedComments = function(req, res) {
  const post_id = req.params.id;
  console.log(post_id);
  const post = Posts.where({
    'id': post_id
  });
  console.log(post.fetch({
    withRelated: 'comments'
  }));
  Posts.where('id', post_id).fetch({
    withRelated: 'comments'
  }).then(function(post) {
    res.json(post.related('comments').toJSON());
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_COMMENT_NOT_FOUND
    });
  });
}

// Get comments from a specific user
CommentsController.getUserComments = function(req, res) {
  const user_id = req.params.id;
  const posts = Posts.where({
    'user_id': user_id
  });
  Comments.where({
    user_id: user_id
  }).fetchAll().then(function(comments) {
    res.json(comments.toJSON());
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_USER_COMMENT_NOT_FOUND
    });
  })
}

// Get a specific comment from a specific feed
CommentsController.getComment = function(req, res) {
  const post_id = req.params.post_id;
  const id = req.params.id;
  Posts.where({
    post_id: post_id,
    id: id
  }).fetch().then(function(post) {
    res.json(post.related('comments').where({
      id: id
    }).fetch().then(function(comment) {
      res.json(comment.toJSON());
    }));
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_COMMENT_NOT_FOUND
    });
  })
}

// Socket link to write new comment to database
CommentsController.directComment = function({
  userId,
  postId,
  text
}, res = null) {
  var user = UsersController.getUserObject(userId);

  // TODO: Link to default anonymous
  var name = "";
  var avatar = "";

  if (user.anonymous == false) {
    name = user.name;
    avatar = user.facebook_profile_img;
  }

  const commentHash = {
    // id: {type: 'increments', nullable: false, primary: true},
    username: name,
    post_id: postId,
    user_id: userId,
    user_avatar_url: avatar,
    text: text,
    created_at: moment.now(),
    updated_at: null
  }

  const comment = new Comments;
  new Comments().save(commentHash).then(function(comment) {
    if (res !== null) {
      res.json(comment);
    }
  }).catch(function(err) {
    if (res !== null) {
      res.json({
        error: MESSAGES.ERROR_POSTING_COMMENT
      });
    }
  });
}

// Post a new comment
CommentsController.postComment = function(req, res) {
  UsersController.findUserId(req.user.id).then(function(userId) {
    this.directComment(userId, req.params.post_id, req.body.text, res);
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_POSTING_COMMENT
    });
  });
}

// TODO: Delete an existing comment


module.exports = CommentsController;
