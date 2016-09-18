import { Posts } from '../database';
var UsersController = require('./UsersController');

const ERROR_NOT_FOUND = "Not Found";

var FeedsController = {};

// Get all the feeds across the database
FeedsController.getFeeds = function(req, res) {
	Posts.fetchAll().then(function(posts) {
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	});
}

// Get all the feeds that belongs to a specific user
FeedsController.getUserFeeds = function(req, res) {
	const id = req.params.id;
	Posts.where('user_id', id).fetchAll().then(function(posts) {
		res.json(posts.toJSON());
	}).catch(function(err) {
		res.json({error: err});
	})
}

// Get a specific feed
FeedsController.getFeed = function(req, res) {
  const id = req.params.id;
  Posts.where('id', id).fetch().then(function(post) {
    res.json(post.toJSON());
  }).catch(function(err) {
    res.json({error: ERROR_NOT_FOUND});
  })
}

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

FeedsController.directPost = function(userId, title, longitude, latitude, emoji, res = null) {
  var user = UsersController.getUserObject(userId);

  // TODO: Link to default anonymous
  var name = "";
  var avatar = "";

  if (user.anonymous == false) {
    name = user.name;
    avatar = user.facebook_profile_img;
  }

	const postHash = {
    // id: {type: 'increments', nullable: false, primary: true},
    emoji: emoji,
    title: title,
    votes: 0,
    user_name: name,
    user_id: userId,
    user_avatar_url: avatar,
    longitude: longitude,
    latitude: latitude,
    replies: 0,
    video_url: "",
    image_url: "",
    sound_cloud_url: "",
    created_at: moment.now(),
    updated_at: null
	};

	new Posts().save(postHash).then(function(post) {
		if (res !== null) {
			res.json(post);
		}
	}).catch(function(err) {
		if (res !== null) {
			res.json(comment);
		}
	});
}

// {user_id:, title: , longitude: , latitude: }
FeedsController.postFeed = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(user_id) {
		FeedsController.directPost(user_id, req.body.title, req.body.longitude, req.body.latitude, req.body.emoji)
	}).catch(function(err) {
		res.json({error: err});
	});
}

module.exports = FeedsController;
