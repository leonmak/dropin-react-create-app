import {
  Comments,
  Users
} from '../database';

var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
var Messages = require('./Messages');

var CommentsController = {};

/*** Parsers ***/
CommentsController.apiParse = function (fetchedComment) {

  // Get user details
  var username = "someone";
  var userID = -1;
  var avatar = "";

  // Validate user and anonymity
  if (typeof fetchedComment.user != 'undefined') {
    var user = fetchedComment.user;
    // if (fetchedComment.anonymous == 0) {
      username = user.facebook_name;
      avatar = user.facebook_profile_img;
      userID = user.id;
    // }
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
    created_at: date,
    updated_at: null
  }

  return parsedComment;
}

/*** Front-end Queries ***/

// Get comments from a specific feed
CommentsController.getFeedComments = function (req, res) {
  const post_id = req.params.id;

  // Find comments belonging to a feed
  Comments.where('post_id', post_id).fetchAll({
    withRelated: ['user']
  }).then(function (comments) {
    // Get all comment objects
    var fetchedComments = comments.toJSON();
    var parsedComments = [];
console.log('62', fetchedComments)

    for (var i = 0; i < fetchedComments.length; ++i) {

      // Get comment object
      var fetchedComment = fetchedComments[i];

      // Parse comment
      var parsedComment = CommentsController.apiParse(fetchedComment);

      // Collate comment
      parsedComments.push(parsedComment);
    }

    res.json(parsedComments);
  }).catch(function (err) {
    res.json({
      error: Messages.ERROR_FETCHING_COMMENT
    });
  })
}

// Get comments from a specific user
CommentsController.getUserComments = function (req, res) {
  const id = req.params.id;

  // Find comments belonging to a user
  Comments.where('user_id', id).fetchAll({
    withRelated: ['user']
  }).then(function (comments) {

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
  }).catch(function (err) {
    res.json({
      error: Messages.ERROR_FETCHING_COMMENTS
    });
  })
}

// Get a specific comment
CommentsController.getComment = function (req, res) {
  const id = req.params.id;

  // Find a specific comment
  Comments.where('id', id).fetch({
    withRelated: ['user']
  }).then(function (comment) {

    // Get all comment objects
    var fetchedComment = comment.toJSON();

    // Parse comment
    var parsedComment = CommentsController.apiParse(fetchedComment);

    res.json(parsedComment);
  }).catch(function (err) {
    res.json({
      error: Messages.ERROR_COMMENT_NOT_FOUND
    });
  })
}

// Socket link to write new comment to database
CommentsController.directComment = function ({
  dropId,
  userId,
  text,
  date
}, res = null) {

  // Prepare the formatted object to store in database
  var commentHash = {
    post_id: dropId,
    user_id: userId,
    text: text,
    created_at: date,
    updated_at: null
  };

  // Promise a user lookup
  var userPromise = new Promise(function (resolve, reject) {
    Users.where('id', userId).fetch().then(function (user) {
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  });

  // Promise to store in database, then return an object for socket emission
  var storePromise = new Promise(function (resolve, reject) {
    new Comments().save(commentHash).then(function (comment) {
      if (comment) {
        if (res !== null) {
          res.json(comment.toJSON());
        } else {
          userPromise.then(function (user) {
            var commentObj = comment;
            commentObj.attributes.user = user.toJSON();
            var jsonObject = CommentsController.apiParse(commentObj.toJSON());
            console.log("JSON Comment to emit: ", jsonObject);
            resolve(jsonObject);
          });

        }
      } else {
        reject(comment);
      }
    });
  });

  return storePromise;
}

// Post a new comment
CommentsController.postComment = function (req, res) {

  var packet = {
    dropId: req.params.id,
    userId: req.body.userId,
    text: req.body.text,
    date: req.body.date
  };

  CommentsController.directComment(packet);

  // Response
  res.end("Comment successfully created.");
}

// Editing a comment
CommentsController.editComment = function (req, res) {
  UsersController.findUserId(req.user.id).then(function(user_id) {
    Comments.where({id: req.params.id, user_id: user_id}).fetch().then(function (comment) {
      if (comment == null) {
        if (res != null) {
           res.json({error: Messages.ERROR_COMMENT_NOT_FOUND});
        }
      } else {
        comment.save({text: req.body.text}).then(function (comment) {
          if (res != null) {
            res.json(comment);
          }
        }).catch(function (err) {
          if (res != null) {
            res.json({error: Messages.ERROR_UPDATING_COMMENT});
          }
        })
      }
    }).catch(function (err) {
      if (res != null) {
        res.json({error: Messages.ERROR_COMMENT_NOT_FOUND});
      }
    });
  }).catch(function(err) {
    if (res != null) {
      res.json({
        error: Messages.ERROR_USER_NOT_FOUND
      });
    }
  });
};

// Deleting a comment
CommentsController.directDelete = function ({id, fb_id}, res = null) {
  UsersController.findUserId(fb_id).then(function(user_id) {
    Comments.where({id: id, user_id: user_id}).fetch().then(function (comment) {
      if (comment) {
        comment.destroy().then(function(comment) {
          if (res != null) {
            res.json(CommentsController.apiParse(comment));
          }
        });
      } else {
        if (res != null) {
          res.json({
            error: Messages.ERROR_COMMENT_NOT_FOUND
          });
        }
      }
    }).catch(function (err) {
      if (res != null) {
        res.json({
          error: Messages.ERROR_COMMENT_NOT_FOUND
        });
      }
    });
  });
};

CommentsController.deleteComment = function (req, res) {
  var packet = {
    id: req.params.id,
    user_id: req.body.user_id
  };

  CommentsController.directDelete(packet, res);
};

module.exports = CommentsController;
