import {
  Votes, Posts
} from '../database';

var FeedsController = require('./FeedsController');
var UsersController = require('./UsersController');
var MESSAGES = require('./Messages');
var VotesController = {};

/*** Front-end Queries ***/

// Get all votes for a specific feed
VotesController.getFeedVotes = function(req, res) {
  const post_id = req.params.id;
  var user_id = req.query.user_id;

  Votes.where('post_id', post_id).fetchAll({
    withRelated: ['user']
  }).then(function (votes) {
    // Get all votes objects
    var fetchedVotes = votes.toJSON();
    var parsedVotes = {upvotes: 0, downvotes: 0, voted: 0};
    var voteState = 0;

    for (var i = 0; i < fetchedVotes.length; ++i) {

      // Check if user voted
      if (fetchedVotes[i].user_id == user_id) {
        voteState = fetchedVotes[i].vote_type;
      }

      // Count votes
      if (fetchedVotes[i].vote_type == 1) {
        parsedVotes.upvotes += 1;
      } else {
        parsedVotes.downvotes += 1;
      }

    }

    parsedVotes.voted = voteState;

    res.json(parsedVotes);
  }).catch(function (err) {
    res.json({
      error: MESSAGES.ERROR_VOTE_NOT_FOUND
    });
  })
};

// Get summary of all votes to a specific user
VotesController.getVotesToUser = function(req, res) {
  const user_id = req.params.id;

  Posts.where('user_id', user_id).fetchAll({withRelated: ['votes']}).then(function (posts) {
    // Get all posts objects
    var fetchedPosts = posts.toJSON();
    var parsedVotes = {upvotes: 0, downvotes: 0};

    // Loop through posts by user
    for (var i = 0; i < fetchedPosts.length; ++i) {

      // Collate votes
      var fetchedVotes = fetchedPosts[i].votes;
      // console.log(fetchedVotes);
      for (var j = 0; j < fetchedVotes.length; ++j) {
        // Count votes
        if (fetchedVotes[j].vote_type == 1) {
          parsedVotes.upvotes += 1;
        } else {
          parsedVotes.downvotes += 1;
        }
      }

    }
    res.json(parsedVotes);
  }).catch(function (err) {
    res.json({
      error: MESSAGES.ERROR_VOTE_NOT_FOUND
    });
  })

};


// Get a specific vote
VotesController.getVote = function(req, res) {
  const vote_id = req.params.id;

  Votes.where('id', vote_id).fetch().then(function (vote) {
    res.json(vote.toJSON());
  }).catch(function (err) {
    res.json({
      error: MESSAGES.ERROR_VOTE_NOT_FOUND
    });
  });

};

// Create a vote
VotesController.directVote = function({
  user_id,
  post_id,
  vote_type}, res = null) {

  // Prepare the formatted object to store in database
  var voteHash = {
    post_id: post_id,
    user_id: user_id,
    vote_type: vote_type
  };

  // Promise to store in database, then return an object for socket emission
  var storePromise = new Promise(function(resolve, reject) {

    Votes.where('post_id', post_id).where('user_id', user_id).fetch().then(function (vote) {
      // Destroy old entry if applicable
      if (vote) {

        if (vote_type == 0) {
          vote.destroy();
        }

        else {
          vote.save(voteHash).then(function (vote) {
            if (vote) {
              if (res !== null) {
                res.json(vote.toJSON());
              } else {
                console.log(vote.toJSON());
                resolve(vote.toJSON());
              }
            } else {
              reject(vote);
            }
          });
        }
      }

      // Create and save new entry
      else if (vote_type != 0) {
        new Votes().save(voteHash).then(function (vote) {
          if (vote) {
            if (res !== null) {
              res.json(vote.toJSON());
            } else {
              console.log(vote.toJSON());
              resolve(vote.toJSON());
            }
          } else {
            reject(vote);
          }
        });
      }

      else {
        reject(vote);
      }

    });
  });

  return storePromise;

};

VotesController.postVote = function(req, res) {
  var packet = {
    user_id: req.body.userId,
    post_id: req.params.id,
    vote_type: req.body.vote_type
  };

  VotesController.directVote(packet);

  // Response
  res.end("Vote successfully captured.");
};

// Editing a vote
VotesController.directEdit = function({post_id, vote_type, user_id}, res = null) {
  var editPromise = new Promise(function(resolve, reject) {
    Votes.where({post_id: post_id, user_id: user_id}).fetch().then(function(vote) {
      // update access token
      if (vote != null) {

        if (vote_type == 0) {
          vote.destroy();
        }

        else {
          vote.save({vote_type}).then(function (vote) {
            resolve(vote);
          }).catch(function (err) {
            reject({
              error: MESSAGES.ERROR_UPDATING_VOTE
            });
          })
        }
      }

      else if (vote_type != 0) {

        new Votes().save({post_id, user_id, vote_type}).then(function (vote) {
          resolve(vote);
        }).catch(function (err) {
          reject({
            error: MESSAGES.ERROR_UPDATING_VOTE
          })
        });
      }

      else {
        reject(vote);
      }

    }).catch(function(err) {
      reject({
        error: MESSAGES.ERROR_VOTE_NOT_FOUND
      })
    });
  });

  return editPromise;
}

VotesController.editVote = function(req, res) {

  UsersController.findUserId(req.user.id).then(function(user_id) {
    var packet = {
      post_id: req.body.drop_id,
      vote_type: req.body.vote_type,
      user_id: user_id
    }
    VotesController.directEdit(packet, res).then(function(editRes) {
      res.json(editRes);
    }).catch(function(editRes) {
      res.json(editRes);
    })

    // Response
    // res.end("Vote has been successfully updated.");
  }).catch(function(err) {
    if (res != null) {
      res.json({
        error: MESSAGES.ERROR_USER_NOT_FOUND
      });
    }
  })
};

// Deleting a vote
VotesController.directDelete = function({post_id, user_id}, res = null) {

  var deletePromise = new Promise(function(resolve, reject){
    Votes.where('post_id', post_id).where('user_id', user_id).destroy().then(function(vote) {
      if (vote) {
        if (res === null) {
          resolve(vote.toJSON());
        }
      } else {
        reject(vote);
      }
    });
  });

  return deletePromise;

};

VotesController.deleteVote = function(req, res) {
  var packet = {
    post_id: req.query.drop_id,
    user_id: req.query.user_id
  };

  VotesController.directDelete(packet, res);

  // Response
  res.end("Vote has been successfully deleted.");
};

module.exports = VotesController;
