var knex = require('./knexconfig');
var bookshelf = require('bookshelf')(knex);

var Users = bookshelf.Model.extend({
	tableName: 'users',

	posts: function() {
		return this.hasMany(Posts);
	}
});

var Posts = bookshelf.Model.extend({
	tableName: 'posts',

	hasTimestamps: true,
	user: function() {
		return this.belongsTo(Users);
	},
	comments: function() {
		return this.hasMany(Comments);
	}
});

var Comments = bookshelf.Model.extend({
	tableName: 'comments',

	user: function() {
		return this.belongsTo(Users);
	},
	post: function() {
		return this.belongsTo(Post);
	}
});

export { Users, Posts, Comments };