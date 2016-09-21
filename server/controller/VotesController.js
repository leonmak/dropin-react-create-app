import {
  Votes
} from '../database';

var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
var MESSAGES = require('./Messages');

var VotesController = {};


/*** Front-end Queries ***/

// TODO: Get all votes for a specific feed

VotesController.getFeedVotes = function(req, res) {
  const post_id = req.params.id;

  Votes.where('post_id', post_id).fetchAll({
    withRelated: ['user']
  }).then(function (votes) {
    // Get all comment objects
    var fetchedVotes = votes.toJSON();
    var parsedVotes = {upvotes: 0, downvotes: 0};

    for (var i = 0; i < fetchedVotes.length; ++i) {

      // Count votes
      if (fetchedVotes[i].vote_type == 1) {
        parsedVotes.upvotes += 1;
      } else {
        parsedVotes.downvotes += 1;
      }
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

};


// TODO: Get a specific vote

VotesController.getVote = function(req, res) {

};


// TODO: Create a vote

VotesController.directVote = function(id, res = null) {

};

VotesController.postVote = function(req, res) {

};


// TODO: Edit a vote

VotesController.directEdit = function(id, res = null) {

};

VotesController.editVote = function(req, res) {

};


// TODO: Delete an existing vote

VotesController.directDelete = function(id, res = null) {

};

VotesController.deleteVote = function(req, res) {

};


module.exports = VotesController;
