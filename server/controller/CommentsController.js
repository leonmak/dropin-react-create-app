import {
  Comments,
  Posts
} from '../database';
var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
var MESSAGES = require('./Messages');

var CommentsController = {};

/*** Parsers ***/
CommentsController.apiParse = function(fetchedComment) {

  // Get user details
  var user = fetchedComment.user;
  var username = "someone";
  var userID = -1;
  var avatar = "";
  if (user.anonymous == 0) {
    username = user.user_name;
    avatar = user.facebook_profile_img;
    userID = user.user_id;
  }

  // Get last updated date
  var date = fetchedComment.created_at;
  if (fetchedComment.updated_at != null) {
    date = fetchedComment.updated_at;
  }

  // Parse and build JSON for API endpoint
  var parsedComment = {
    id: fetchedComment.id,
    username: username,
    dropId: fetchedComment.post_id,
    userId: userID,
    userAvatarId: avatar,
    text: fetchedComment.text,
    createdAt: date
  }

  return parsedComment;
}

/*** Front-end Queries ***/

// Get comments from a specific feed
CommentsController.getFeedComments = function(req, res) {
  const post_id = req.params.id;

  Comments.where('post_id', post_id).fetchAll({
    withRelated: ['user']
  }).then(function(comments) {
    // Get all comment objects
    var fetchedComments = comments.toJSON();
    var parsedComments = [];

    for (var i = 0; i < fetchedComments.length; ++i) {

      // Get comment object
      var fetchedComment = fetchedComments[i];

      // Parse comment
      var parsedComment = CommentsController.apiParse(fetchedComment);

      // Collate comment
      parsedComments.push(parsedComment);
      console.log(parsedComment);
    }

    res.json(parsedComments);
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_COMMENT_NOT_FOUND
    });
  })
}

// Get comments from a specific user
CommentsController.getUserComments = function(req, res) {
  const user_id = req.params.id;

  Comments.where('user_id', user_id).fetchAll({
    withRelated: ['user']
  }).then(function(comments) {
    // Get all comment objects
    var fetchedComments = comments.toJSON();
    var parsedComments = [];

    for (var i = 0; i < fetchedComments.length; ++i) {

      // Get comment object
      var fetchedComment = fetchedComments[i];

      // Parse comment
      var parsedComment = CommentsController.apiParse(fetchedComment);

      // Collate comments
      parsedComments.push(parsedComment);
      console.log(parsedComment);
    }

    res.json(parsedComments);
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_COMMENT_NOT_FOUND
    });
  })
}

// Get a specific comment
CommentsController.getComment = function(req, res) {
  const id = req.params.id;

  Comments.where('id', id).fetch({
    withRelated: ['user']
  }).then(function(comment) {
    // Get all comment objects
    var fetchedComment = comment.toJSON();

    // Parse comment
    var parsedComment = CommentsController.apiParse(fetchedComment);

    res.json(parsedComment);
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

  // const comment = new Comments;
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
