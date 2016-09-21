import {
  Votes, Posts
} from '../database';

var FeedsController = require('./FeedsController');
var MESSAGES = require('./Messages');

var VotesController = {};


/*** Front-end Queries ***/

// TODO: Get all votes for a specific feed

VotesController.getFeedVotes = function(req, res) {
  const post_id = req.params.id;
  const user_id = req.query.user_id;

  Votes.where('post_id', post_id).fetchAll({
    withRelated: ['user']
  }).then(function (votes) {
    // Get all votes objects
    var fetchedVotes = votes.toJSON();
    var parsedVotes = {upvotes: 0, downvotes: 0, voted: 1};
    var hasVoted = false;

    for (var i = 0; i < fetchedVotes.length; ++i) {

      console.log(user_id);
      // Check if user voted
      if (fetchedVotes[i].user.id == user_id) {
        hasVoted = true;
      }

      // Count votes
      if (fetchedVotes[i].vote_type == 1) {
        parsedVotes.upvotes += 1;
      } else {
        parsedVotes.downvotes += 1;
      }

    }

    if (!hasVoted && typeof user_id != 'undefined') {
      parsedVotes.voted = -1;
    }

    res.json(parsedVotes);
  }).catch(function (err) {
    res.json({
      error: MESSAGES.ERROR_VOTE_NOT_FOUND
    });
  })
};

// TODO: Get summary of all votes to a specific user

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
      console.log(fetchedVotes);
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


// TODO: Get a specific vote

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

// TODO: Create a vote

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

    Votes.where('post_id', post_id).where('user_id', user_id).fetch().then(function(vote) {
      // Destroy old entry if applicable
      if (vote) {
        vote.destroy();
      }
      // Create and save new entry
      new Votes().save(voteHash).then(function(vote) {
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


// TODO: Delete an existing vote

VotesController.directDelete = function(id, res = null) {

};

VotesController.deleteVote = function(req, res) {

};


module.exports = VotesController;
