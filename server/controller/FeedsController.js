import {
  Posts, Users
} from '../database';

var UsersController = require('./UsersController');
var CommentsController = require('./CommentsController');
var VotesController = require('./VotesController');
var Messages = require('./Messages');

var FeedsController = {};

/*** Parsers ***/
FeedsController.apiParse = function (fetchedPost, user_id) {
  // Get user details
  var username = "someone";
  var userID = -1;
  var avatar = "http://unshelteredvoices.org/img/people/anon.jpg";

  // Validate user and anonymity
  // console.log(fetchedPost.user);
  if (typeof fetchedPost.user != 'undefined' && fetchedPost.user != null && fetchedPost.anonymous == 0) {
    var user = fetchedPost.user;
    username = user.facebook_name;
    avatar = user.facebook_profile_img;
    userID = user.id;
  }

  // Get the votes count and status
  var voteCount = 0;
  var voteState = 0;

  // Count votes and check user voting
  if (typeof fetchedPost.votes != 'undefined') {
    var votes = fetchedPost.votes;

    for (var j = 0; j < votes.length; ++j) {
      var vote = votes[j];

      // Check if user voted
      if (vote.user_id == user_id) {
        voteState = vote.vote_type;
      }

      voteCount += vote.vote_type;
    }
  }

  // Get last updated date
  var date = fetchedPost.created_at;
  if (fetchedPost.updated_at != null) {
    date = fetchedPost.updated_at;
  }

  // Get replies count
  var commentCount = 0;
  if (typeof fetchedPost.comments != 'undefined') {
    var comments = fetchedPost.comments;
    commentCount = comments.length;
  }

  // Validate and parse links
  var videoLink = null;
  if (typeof fetchedPost.video != 'undefined') {
    videoLink = fetchedPost.video;
  }

  var imageLink = null;
  if (typeof fetchedPost.image != 'undefined') {
    imageLink = fetchedPost.image;
  }

  var soundLink = null;
  if (typeof fetchedPost.sound != 'undefined') {
    soundLink = fetchedPost.sound;
  }

  // Parse and build JSON for API endpoint
  var parsedPost = {
    dropId: fetchedPost.id,
    username: username,
    userId: userID,
    userAvatarId: avatar,
    emojiUni: fetchedPost.emoji,
    title: fetchedPost.title,
    videoUrl: videoLink,
    imageId: imageLink,
    soundCloudUrl: soundLink,
    votes: voteCount,
    voted: voteState,
    location: [fetchedPost.longitude, fetchedPost.latitude],
    date: date,
    replies: commentCount
  }

  return parsedPost;
}

/*** Front-end Queries ***/

// Get all the feeds across the database
FeedsController.getFeeds = function (req, res) {

  // Get the logged-in userID
  var sessionFbId = -1;
  if (typeof req.user != 'undefined') {
    sessionFbId = req.user.id;
    // console.log(req.user);

  }

  UsersController.findUserId(sessionFbId).then(function(user_id) {
    if (!user_id) {
      user_id = -1;
    }
    // Get joint table objects
    Posts.fetchAll({
      withRelated: ['votes', 'comments', 'user']
    }).then(function (posts) {
      // Get all posts objects
      var fetchedPosts = posts.toJSON();
      var parsedPosts = [];

      for (var i = 0; i < fetchedPosts.length; ++i) {

        // Get post object
        var fetchedPost = fetchedPosts[i];

        // Parse post
        var parsedPost = FeedsController.apiParse(fetchedPost, user_id);

        // Collate post
        parsedPosts.push(parsedPost);
        // console.log(parsedPost);
      }

      // console.log("GET ALL FEEDS : ", fetchedPosts);
      res.json(parsedPosts);

    }).catch(function (err) {
      res.json({
        error: Messages.ERROR_FETCHING_POST
      });
    });
  });
};

// Calculate shortest distance away
FeedsController._dist = function (long1, lat1, long2, lat2) {
  return Math.sqrt((long1 - long2) * (long1 - long2) + (lat1 - lat2) * (lat1 - lat2))
}

// Get all the feeds across the database
FeedsController.getFeedsInRadius = function (req, res) {

  // Get the logged-in userID
  var sessionFbId = -1;
  if (typeof req.user != 'undefined') {
    sessionFbId = req.user.id;
  }

  UsersController.findUserId(sessionFbId).then(function(user_id) {
    if (!user_id) {
      user_id = -1;
    }
    // Compute range and query for feeds within range
    var userLong = parseFloat(req.query.longitude);
    var userLat = parseFloat(req.query.latitude);
    var userRadius = parseFloat(req.query.radius);
    // console.log(userLong + userRadius);

    // Get joint table objects
    Posts.query(function (qb) {
      qb.where('longitude', '>=', userLong - userRadius)
        .andWhere('longitude', '<=', userLong + userRadius)
        .andWhere('latitude', '>=', userLat - userRadius)
        .andWhere('latitude', '<=', userLat + userRadius)
    }).fetchAll({
      withRelated: ['votes', 'comments', 'user']
    }).then(function (posts) {

      // Get all posts objects
      var fetchedPosts = posts.toJSON();
      var parsedPosts = [];

      for (var i = 0; i < fetchedPosts.length; ++i) {

        // Get post object
        var fetchedPost = fetchedPosts[i];
        if (FeedsController._dist(fetchedPost.longitude, fetchedPost.latitude, userLong, userLat) <= userRadius) {
          // Parse post
          var parsedPost = FeedsController.apiParse(fetchedPost, user_id);
          // Collate post
          parsedPosts.push(parsedPost);
          // console.log(parsedPost);
        }
      }
      // console.log("GET FEEDS IN RANGE : ", fetchedPosts);
      res.json(parsedPosts);

    }).catch(function (err) {
      res.json({
        error: Messages.ERROR_FETCHING_POST
      });
    });
  });
};

// Get all the feeds that belongs to a specific user
FeedsController.getUserFeeds = function (req, res) {
  const id = req.params.id;

  // Get the logged-in userID
  var sessionFbId = -1;
  if (typeof req.user != 'undefined') {
    sessionFbId = req.user.id;
  }

  UsersController.findUserId(sessionFbId).then(function(user_id) {
    console.log("USER_ID : ", user_id);
    console.log("ID : ", id);

    if (user_id == null || typeof user_id == 'undefined' ) {
      user_id = -1;
    }
    // Display or hide anonymous posts according to login session
    if (user_id != id) {
      // Get joint table objects
      Posts.where({'user_id': id, 'anonymous': 0}).fetchAll({
        withRelated: ['votes', 'comments', 'user']
      }).then(function (posts) {
        // Get all posts objects
        var fetchedPosts = posts.toJSON();
        var parsedPosts = [];

        for (var i = 0; i < fetchedPosts.length; ++i) {

          // Get post object
          var fetchedPost = fetchedPosts[i];

          // Parse post
          var parsedPost = FeedsController.apiParse(fetchedPost, user_id);

          // Collate post
          parsedPosts.push(parsedPost);
        }

        console.log("GET USER FEEDS : ", parsedPosts);
        res.json(parsedPosts);
      }).catch(function (err) {
        res.json({
          error: Messages.ERROR_FETCHING_POST
        });
      })
    } else {
      // Get joint table objects
      Posts.where('user_id', id).fetchAll({
        withRelated: ['votes', 'comments', 'user']
      }).then(function (posts) {
        // Get all posts objects
        var fetchedPosts = posts.toJSON();
        var parsedPosts = [];

        for (var i = 0; i < fetchedPosts.length; ++i) {

          // Get post object
          var fetchedPost = fetchedPosts[i];

          // Parse post
          var parsedPost = FeedsController.apiParse(fetchedPost, id);

          // Collate post
          parsedPosts.push(parsedPost);
        }

        console.log("GET USER FEEDS : ", parsedPosts);
        res.json(parsedPosts);
      }).catch(function (err) {
        res.json({
          error: Messages.ERROR_FETCHING_POST
        });
      })
    }
  });
};

// Get a specific feed
FeedsController.getFeed = function (req, res) {
  const id = req.params.id;

  // Get the logged-in userID
  var sessionFbId = -1;
  if (typeof req.user != 'undefined') {
    sessionFbId = req.user.id;
  }

  UsersController.findUserId(sessionFbId).then(function(user_id) {
    if (!user_id) {
      user_id = -1;
    }
    Posts.where('id', id).fetch({
      withRelated: ['votes', 'comments', 'user']
    }).then(function (post) {
      var parsedPost = FeedsController.apiParse(post.toJSON(), user_id);
      res.json(parsedPost);
    }).catch(function (err) {
      res.json({
        error: Messages.ERROR_FETCHING_POST
      });
    });

  });
};

// Socket link to write new feed to database
FeedsController.directPost = function ({
  userID,
  emoji,
  title,
  video,
  image,
  sound,
  longitude,
  latitude,
  date,
  anonymous}, res = null) {

  // Promise a user lookup
  var userPromise = new Promise(function (resolve, reject) {
    Users.where('id', userID).fetch().then(function (user) {
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  });

  // Prepare the formatted object to store in database
  var postHash = {
    user_id: userID,
    emoji: emoji,
    title: title,
    video: video,
    image: image,
    sound: sound,
    longitude: longitude,
    latitude: latitude,
    created_at: date,
    updated_at: null,
    anonymous: anonymous
  };

  // Promise to store in database, then return an object for socket emission
  var storePromise = new Promise(function (resolve, reject) {
    new Posts().save(postHash).then(function (post) {
      if (post) {
        if (res !== null) {
          res.json(post.toJSON());
        } else {
          userPromise.then(function (user) {
            var postObj = post;
            postObj.attributes.user = user.toJSON();
            var jsonObject = FeedsController.apiParse(postObj.toJSON(), userID);
            resolve(jsonObject);
          });
        }
      } else {
        reject(post);
      }
    });
  });

  return storePromise;
};

// Post a new feed
FeedsController.postFeed = function (req, res) {
  var packet = {
    userID: req.body.userID,
    emoji: req.body.emoji,
    title: req.body.title,
    video: req.body.video,
    image: req.body.image,
    sound: req.body.sound,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    date: req.body.date,
    anonymous: req.body.anonymous
  };

  FeedsController.directPost(packet);

  // Response
  res.end(Messages.SUCCESS_CREATED_POST);

};

// Editing a feed
FeedsController.directEdit = function ({
  postID,
  userID,
  emoji,
  title,
  video,
  image,
  sound,
  longitude,
  latitude,
  updated_at,
  anonymous}, res = null) {

  // Promise a user lookup
  var userPromise = new Promise(function (resolve, reject) {
    Users.where('id', userID).fetch().then(function (user) {
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  });

  var editPromise = new Promise(function (resolve, reject) {
    var commentsJSON = null;
    var votesJSON = null;
    var userJSON = null;
    Posts.where({id: postID, user_id: userID}).fetch({withRelated: ['votes', 'comments', 'user']}).then(function (post) {
      // update access token
      if (post != null) {
        commentsJSON = post.toJSON().comments;
        votesJSON = post.toJSON().votes;
        userJSON = post.toJSON().user;

        // Validation
        if (typeof video == 'undefined') {
          video = null;
        }
        if (typeof image == 'undefined') {
          image = null;
        }
        if (typeof sound == 'undefined') {
          sound = null;
        }

        post.save({
          emoji,
          title,
          video,
          image,
          sound,
          longitude,
          latitude,
          updated_at,
          anonymous
        }).then(function (post) {
          var jsonObj = post.toJSON();
          jsonObj.votes = votesJSON;
          jsonObj.comments = commentsJSON;
          jsonObj.user = userJSON;
          var parsedPost = FeedsController.apiParse(jsonObj, userID);
          console.log("THIS IS THE EDITED POST: ", parsedPost);
          resolve(parsedPost);
        }).catch(function (err) {
          reject({
            error: Messages.ERROR_UPDATING_POST
          });
        })
      } else {

        // Validation
        if (typeof video == 'undefined') {
          video = null;
        }
        if (typeof image == 'undefined') {
          image = null;
        }
        if (typeof sound == 'undefined') {
          sound = null;
        }

        new Posts().save({
          user_id: userID,
          emoji: emoji,
          title: title,
          video: video,
          image: image,
          sound: sound,
          longitude: longitude,
          latitude: latitude,
          created_at: updated_at,
          updated_at: null,
          anonymous: anonymous
        }).then(function (post) {

          userPromise.then(function (user) {
            var postObj = post;
            postObj.attributes.user = user.toJSON();
            var jsonObject = FeedsController.apiParse(postObj.toJSON(), userID);
            console.log("THIS IS THE EDITED POST: ", jsonObject);
            resolve(jsonObject);
          });

        }).catch(function (err) {
          reject({
            error: Messages.ERROR_UPDATING_POST
          })
        });
      }
    }).catch(function (err) {
      reject({
        error: Messages.ERROR_POST_NOT_FOUND
      })
    });
  });

  return editPromise;
}

// Edit feed wrapper
FeedsController.editFeed = function (req, res) {

  var packet = {
    postID: req.body.dropId,
    userID: req.body.userId,
    emoji: req.body.emojiUni,
    title: req.body.title,
    video: req.body.videoUrl,
    image: req.body.imageId,
    sound: req.body.soundCloudUrl,
    longitude: req.body.location[0],
    latitude: req.body.location[1],
    updated_at: req.body.date,
    anonymous: req.body.anonymous
  };

  FeedsController.directEdit(packet, res);

  // Response
  res.end(Messages.SUCCESS_UPDATED_POST);
};

// Deleting a Feed
FeedsController.directDelete = function ({id, fb_id}, res = null) {
  UsersController.findUserId(fb_id).then(function(user_id) {
    Posts.where({'id': id, 'user_id': user_id}).fetch().then(function (post) {
      if (post) {
        post.destroy().then(function(post) {
          if (res != null) {
            res.json(FeedsController.apiParse(post.toJSON()));
          }
        });
      } else {
        if (res != null) {
          res.json(Messages.ERROR_POST_NOT_FOUND);
        }
      }
    }).catch(function (err) {
      if (res != null) {
        res.json(Messages.ERROR_POST_NOT_FOUND);
      }
    });
  });
};

// Delete feed wrapper
FeedsController.deleteFeed = function (req, res) {
// Get the logged-in userID
  var sessionFbId = -1;
  if (typeof req.user != 'undefined') {
    sessionFbId = req.user.id;
  }

  UsersController.findUserId(sessionFbId).then(function(user_id) {
    if (!user_id) {
      user_id = -1;
    }
    var packet = {
      id: req.params.id,
      fb_id: user_id
    };

    FeedsController.directDelete(packet, res);
  });

};

module.exports = FeedsController;
