import { Posts } from '../database';
var UsersController = require('./UsersController');
var CommentsController = require('./CommentsController');
var MESSAGES = require('./Messages');

var FeedsController = {};

// Mapping function to parse feeds from database schema to expected format for API endpoint
FeedsController.parseFeed = function(post) {

  // Get user details
  // TODO: Generate unique anonymous name
  var username = "";
  var userID = -1;
  // TODO: Link to default anonymous profile avatar
  var avatar = "";
  var user = UsersController.getUserObject(post.user_id);
  if (user.anonymous == false) {
    username = user.name;
    avatar = user.facebook_profile_img;
    userID = post.user_id;
  }

  // Get vote details
  var voteCounts = VotesController.getFeedVoteCount();

  // Get last updated date
  var date = post.created_at;
  if (post.updated_at != null) {
    date = post.updated_at;
  }

  // Get replies count
  var replyCounts = CommentsController.getFeedCommentCount(post.id);

  // Parse and build JSON for API endpoint
  var parsedPost = {
    "dropId": post.id,
    "username": username,
    "userId": userID,
    "userAvatarId": avatar,
    "emojiUni": post.emoji,
    "title": post.title,
    "videoUrl": post.video,
    "imageId": post.image,
    "soundCloudUrl": post.sound,
    "votes": voteCounts,
    "location": [post.longitude, post.latitude],
    "date": date,
    "replies": replyCounts
  }

  return parsedPost;
}

/*** Back-end Queries ***/


/*** Front-end Queries ***/

// Get all the feeds across the database
FeedsController.getFeeds = function(req, res) {
	Posts.fetchAll({withRelated: "user"}).then(function(posts) {
    posts.map(FeedsController.parseFeed);
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_POST_NOT_FOUND});
	});
}

// Get all the feeds that belongs to a specific user
FeedsController.getUserFeeds = function(req, res) {
	const id = req.params.id;
	Posts.where('user_id', id).fetchAll().then(function(posts) {
    posts.map(FeedsController.parseFeed);
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: MESSAGES.ERROR_USER_POST_NOT_FOUND});
	})
}

// Get a specific feed
FeedsController.getFeed = function(req, res) {
  const id = req.params.id;
  Posts.where('id', id).fetch().then(function(post) {
    var parsedPost = FeedsController.parseFeed(post);
    res.json(parsedPost.toJSON());
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
