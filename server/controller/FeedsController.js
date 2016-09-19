import { Posts } from '../database';
var UsersController = require('./UsersController');
var CommentsController = require('./CommentsController');
var VotesController = require('./VotesController');
var MESSAGES = require('./Messages');

var FeedsController = {};

/*** Parsers ***/
FeedsController.apiParse = function(fetchedPost) {

  // Get user details
  var user = fetchedPost.user;

  var username = "";
  var userID = -1;
  var avatar = "";
  if (fetchedPost.anonymous == 0) {
    username = fetchedPost.user_name;
    avatar = fetchedPost.facebook_profile_img;
    userID = fetchedPost.user_id;
  }


  // Get the votes count
  var votes = fetchedPost.votes;
  var voteCount = 0;
  for (var j = 0; j < votes.length; ++j) {
    var vote = votes[j];
    if(vote.vote_type) {
      voteCount++;
    } else {
      voteCount--;
    }
  }

  // Get last updated date
  var date = fetchedPost.created_at;
  if (fetchedPost.updated_at != null) {
    date = fetchedPost.updated_at;
  }


  // Get replies count
  var comments = fetchedPost.comments;
  var commentCount = comments.length;


  // Parse and build JSON for API endpoint
  var parsedPost = {
    dropId:fetchedPost.id,
    username:username,
    userId:userID,
    userAvatarId:avatar,
    emojiUni:fetchedPost.emoji,
    title:fetchedPost.title,
    videoUrl:fetchedPost.video,
    imageId:fetchedPost.image,
    soundCloudUrl:fetchedPost.sound,
    votes: voteCount,
    location:[fetchedPost.longitude, fetchedPost.latitude],
    date: date,
    replies: commentCount
  }

  return parsedPost;
}

/*** Back-end Queries ***/
//...

/*** Front-end Queries ***/

// Get all the feeds across the database
FeedsController.getFeeds = function(req, res) {

  Posts.fetchAll({withRelated: ['votes', 'comments', 'user']}).then(function(posts) {
    // Get all posts objects
    var fetchedPosts = posts.toJSON();
    var parsedPosts = [];

    for (var i = 0; i < fetchedPosts.length; ++i) {

      // Get post object
      var fetchedPost = fetchedPosts[i];

      // Parse post
      var parsedPost = FeedsController.apiParse(fetchedPost);

      // Collate post
      parsedPosts.push(parsedPost);
      // console.log(parsedPost);
    }

    // console.log(fetchedPosts);
    res.json(parsedPosts);

  }).catch(function(err) {
    res.json({error: MESSAGES.ERROR_POST_NOT_FOUND});
  });

}

// Get all the feeds that belongs to a specific user
FeedsController.getUserFeeds = function(req, res) {
	const id = req.params.id;
	Posts.where('user_id', id).fetchAll({withRelated: ['votes', 'comments', 'user']}).then(function(posts) {
    // Get all posts objects
    var fetchedPosts = posts.toJSON();
    var parsedPosts = [];

    for (var i = 0; i < fetchedPosts.length; ++i) {

      // Get post object
      var fetchedPost = fetchedPosts[i];

      // Parse post
      var parsedPost = FeedsController.apiParse(fetchedPost);

      // Collate post
      parsedPosts.push(parsedPost);
      // console.log(parsedPost);
    }

		res.json(parsedPosts);
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_USER_POST_NOT_FOUND});
	})
}

// Get a specific feed
FeedsController.getFeed = function(req, res) {
  const id = req.params.id;
  Posts.where('id', id).fetch({withRelated: ['votes', 'comments', 'user']}).then(function(post) {
    var parsedPost = FeedsController.apiParse(post);
    res.json(parsedPost);
  }).catch(function(err) {
    res.json({error: MESSAGES.ERROR_POST_NOT_FOUND});
  })
}

// Socket link to write new feed to database
FeedsController.directPost = function(userID, emoji, title, video, image, sound, location, date, res = null) {

  var longitude = location[0];
  var latitude = location[1];
  var id = -1;

  // Posts.fetchAll().then(function(posts) {
  //   id = posts.count() + 1;
  // }

  const postHash = {
    // id: id,
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

	new Posts().save(postHash).then(function(post) {
		if (res !== null) {
			res.json(post);
		}
	}).catch(function(err) {
	  // TODO: What does this do?
		// if (res !== null) {
		// 	res.json(comment);
		// }
    res.json({error: MESSAGES.ERROR_CREATING_DROP});
  });
}

// Post a new feed
FeedsController.postFeed = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(user_id) {
      FeedsController.directPost(user_id,
        req.body.emojiUni,
        req.body.title,
        req.body.videoUrl,
        req.body.imageId,
        req.body.soundCloudUrl,
        req.body.location,
        req.body.date);
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_POSTING_MESSAGE});
	});
}

// TODO: Delete an existing feed


module.exports = FeedsController;



// OLD STUFF

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
