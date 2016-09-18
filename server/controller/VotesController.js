import { Comments, Posts } from '../database';
var UsersController = require('./UsersController');
var FeedsController = require('./FeedsController');
var MESSAGES = require('./Messages');

var VotesController = {};

/*** Back-end Queries ***/
// Get votes count for a specific feed
VotesController.getFeedVoteCount = function(post_id) {
  var count = 0;
  const post = Posts.where({'id': post_id});
  Posts.where('id', post_id).fetch({withRelated: 'votes'}).then(function(post) {
    var votes = post.related('votes');
    votes.forEach(function(vote) {
      if(vote.vote_type) {
        count++;
      } else {
        count--;
      }
    });
    return count;
  }).catch(function(err) {
    return 0;
  });
}

/*** Front-end Queries ***/

// TODO: Get all votes for a specific user


// TODO: Get a specific vote for a specific feed


// TODO: Socket link to update vote in database


// TODO: Create or update a vote


// TODO: Delete an existing vote


module.exports = VotesController;
