import {
  Posts, Users
} from '../database';

var UsersController = require('./UsersController');
var CommentsController = require('./CommentsController');
var VotesController = require('./VotesController');
var MESSAGES = require('./Messages');

var FeedsController = {};


/*** Parsers ***/
FeedsController.apiParse = function(fetchedPost, user_id) {

  // Get user details
  var username = "someone";
  var userID = -1;
  var avatar = "";

  if (typeof fetchedPost.user != 'undefined') {
    var user = fetchedPost.user;
    if (user.anonymous == 0) {
      username = user.facebook_name;
      avatar = user.facebook_profile_img;
      userID = user.id;
    }
  }

  // Get the votes count and status
  var voteCount = 0;
  var voted = 1;
  var hasVoted = false;

  if (typeof fetchedPost.votes != 'undefined') {
    var votes = fetchedPost.votes;

    for (var j = 0; j < votes.length; ++j) {
      var vote = votes[j];

      // Check if user voted
      if (vote.user_id == user_id) {
        hasVoted = true;
      }

      if (vote.vote_type) {
        voteCount++;
      } else {
        voteCount--;
      }
    }

    if (!hasVoted && typeof user_id != 'undefined' && user_id != -1) {
      voted = -1;
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

  var videoLink = null;
  if (typeof fetchedPost.video != 'undefined') {
    videoLink = fetchedPost.video;
  };

  var imageLink = null;
  if (typeof fetchedPost.image != 'undefined') {
    imageLink = fetchedPost.image;
  };

  var soundLink = null;
  if (typeof fetchedPost.sound != 'undefined') {
    soundLink = fetchedPost.sound;
  };


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
    voted: voted,
    location: [fetchedPost.longitude, fetchedPost.latitude],
    date: date,
    replies: commentCount
  }

  return parsedPost;
}

/*** Front-end Queries ***/

// Get all the feeds across the database
FeedsController.getFeeds = function(req, res) {

  // Get the logged-in userID
  var user_id = -1;
  if (typeof req.query.user_id != 'undefined') {
    user_id = req.query.user_id;
  }

  // Get joint table objects
  Posts.fetchAll({
    withRelated: ['votes', 'comments', 'user']
  }).then(function(posts) {
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

    // console.log(fetchedPosts);
    res.json(parsedPosts);

  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_POST_NOT_FOUND
    });
  });
}

FeedsController._dist = function(long1, lat1, long2, lat2) {
  return Math.sqrt((long1 - long2) * (long1 - long2) + (lat1 - lat2) * (lat1 - lat2))
}

// Get all the feeds across the database
FeedsController.getFeedsInRadius = function(req, res) {

  // Get the logged-in userID
  var user_id = -1;
  if (typeof req.query.user_id != 'undefined') {
    user_id = req.query.user_id;
  }

  // Get joint table objects
  Posts.fetchAll({
    withRelated: ['votes', 'comments', 'user']
  }).then(function(posts) {
    // Get all posts objects
    var fetchedPosts = posts.toJSON();
    var parsedPosts = [];
    var userLong = req.query.longitude;
    var userLat = req.query.latitude;
    var userRadius = req.query.radius;

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

    // console.log(fetchedPosts);
    res.json(parsedPosts);

  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_POST_NOT_FOUND
    });
  });
}

// Get all the feeds that belongs to a specific user
FeedsController.getUserFeeds = function(req, res) {
  const id = req.params.id;

  // Get the logged-in userID
  var user_id = -1;
  if (typeof req.query.user_id != 'undefined') {
    user_id = req.query.user_id;
  }

  // Get joint table objects
  Posts.where('user_id', id).fetchAll({
    withRelated: ['votes', 'comments', 'user']
  }).then(function(posts) {
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

    res.json(parsedPosts);
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_USER_POST_NOT_FOUND
    });
  })
}

// Get a specific feed
FeedsController.getFeed = function(req, res) {
  const id = req.params.id;

  // Get the logged-in userID
  var user_id = -1;
  if (typeof req.query.user_id != 'undefined') {
    user_id = req.query.user_id;
  }

  Posts.where('id', id).fetch({
    withRelated: ['votes', 'comments', 'user']
  }).then(function(post) {
    var parsedPost = FeedsController.apiParse(post.toJSON(), user_id);
    res.json(parsedPost);
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_POST_NOT_FOUND
    });
  })
}

// Socket link to write new feed to database
FeedsController.directPost = function({
  userID,
  emoji,
  title,
  video,
  image,
  sound,
  longitude,
  latitude,
  date
}, res = null) {

  // Promise a user lookup
  var userPromise = new Promise(function(resolve, reject) {
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
    updated_at: null
  };

  // Promise to store in database, then return an object for socket emission
  var storePromise = new Promise(function(resolve, reject){
    new Posts().save(postHash).then(function(post) {
      if (post) {
        if (res !== null) {
          res.json(post.toJSON());
        } else {
          userPromise.then(function(user) {
            var postObj = post;
            postObj.attributes.user = user.toJSON();
            var jsonObject = FeedsController.apiParse(postObj.toJSON());
            resolve(jsonObject);
          });

        }
      } else {
        reject(post);
      }
    });
  });

  return storePromise;
}

// Post a new feed
FeedsController.postFeed = function(req, res) {
  var packet = {
    userID: req.user.id,
    emoji: req.body.emojiUni,
    title: req.body.title,
    video: req.body.videoUrl,
    image: req.body.imageId,
    sound: req.body.soundCloudUrl,
    longitude: req.body.location[0],
    latitude: req.body.location[1],
    date: req.body.date};

  FeedsController.directPost(packet);

  // Response
  res.end("Drop successfully created.");

};

// TODO: Delete an existing feed

FeedsController.directDelete = function({id}, res = null) {
  Posts.where('id', id).destroy().then(function(post) {
    res.json(FeedsController.apiParse(post));
  }).catch(function(err) {
    if (res != null) {
      res.json({
        error: MESSAGES.ERROR_POST_NOT_FOUND
     });
    }
  });
};

FeedsController.deleteFeed = function(req, res) {

  var packet = {
    id: req.params.id,
  };

  FeedsController.directDelete(packet, res);

  // Response
  res.end("feed is successfully deleted.");
};


module.exports = FeedsController;
