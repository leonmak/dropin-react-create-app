import {
  Users
} from '../database';
var MESSAGES = require('./Messages');

var UsersController = {};


/*** Front-end Queries ***/

// Obtain user's User ID (Requires Login)
UsersController.findUserId = function(facebook_id) {
  var promise = new Promise(function(resolve, reject) {
    Users.where('facebook_id', facebook_id).fetch().then(function(user) {
      resolve(user.id);
    }).catch(function(err) {
      reject(MESSAGES.ERROR_AUTHENTICATION_FAILURE);
    });
  })
  return promise;
}

// Get all the users across the database
UsersController.getUsers = function(req, res) {
  Users.fetchAll().then(function(users) {
    res.json(users.toJSON());
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_USER_NOT_FOUND
    });
  });
}

// Get a specific user
UsersController.getUser = function(req, res) {
  const id = req.params.id;
  Users.where('id', id).fetch().then(function(user) {
    res.json(user.toJSON());
  }).catch(function(err) {
    res.json({
      error: MESSAGES.ERROR_USER_NOT_FOUND
    });
  })
}

// Get a user object reference for back-end parsing and JSON object construction
UsersController.getUserObject = function(id) {


  Users.where('id', id).fetch().then(function(user) {
    console.log(user.toJSON());
  }).catch(function(err) {
    //...
  })
}

// Creating a new user
UsersController.createUser = function(accessToken, profile, callback) {
  Users.where('facebook_id', profile.id).fetch().then(function(user) {
    if (user) {
      // update access token
      user.save({
        facebook_token: accessToken,
        facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null
      });
      // add user id to profile
      profile.userId = user.id;
      return callback(null, profile);
    } else {
      // create new one
      const userHash = {
        facebook_id: profile.id,
        facebook_name: profile.displayName,
        facebook_profile_img: profile.photos.length > 0 ? profile.photos[0].value : null,
        facebook_token: accessToken,
        user_avatar_url: profile.photos.length > 0 ? profile.photos[0].value : null,
        user_name: profile.displayName,
      }
      new Users().save(userHash).then(function(user) {
        profile.userId = user.id;
        return callback(null, profile);
      }).catch(function(err) {
        console.log(err)
          // res.json({error: MESSAGES.ERROR_CREATING_USER});
      });
    }
  });
}

// TODO: Edit an existing user

UsersController.directEdit = function({
	id,
	user_avatar_url,
	anonymous,
  user_name
}, res = null) {
  Users.where('id', id).fetch().then(function(user) {
    // update access token
    if (user_avatar_url != undefined) {
	    user.save({ user_avatar_url });
	  }
    if (anonymous != undefined) {
	    user.save({ anonymous });
	  }
    if (user_name != undefined) {
      user.save({ user_name: user_name });
    }
  }).catch(function(err) {
  	if (res != null) {
	    res.json({
  	    error: MESSAGES.ERROR_USER_NOT_FOUND
    	});
	  }
  });
};

UsersController.editUser = function(req, res) {
	UsersController.findUserId(req.user.id).then(function(id) {
    console.log(id)
  	var packet = {
    	id: id,
    	user_avatar_url: req.body.user_avatar_url,
    	anonymous: req.body.anonymous,
      user_name: req.body.user_name
  	};
  	UsersController.directEdit(packet, res);

  	// Response
	  res.end("user is successfully updated.");
	}).catch(function(err) {
		res.json(err);
	});
};


// TODO: Delete an existing user

UsersController.directDelete = function(id, res = null) {
  Users.where('id', id).destroy().then(function(user) {
    res.json(user);
  }).catch(function(err) {
  	if (res != null) {
	    res.json({
  	    error: MESSAGES.ERROR_USER_NOT_FOUND
    	});
	  }
  });
};

UsersController.deleteUser = function(req, res) {
  var packet = {
    id: req.params.id,
  };

  UsersController.directDelete(packet, res);

  // Response
  res.end("user is successfully deleted.");
};

module.exports = UsersController;
