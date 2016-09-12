var Schema = {
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		anonymous: {type: 'boolean', nullable: false, defaultTo: true},
		facebook_id: {type: 'string', nullable: false, unique: true},
		facebook_name: {type: 'string', nullable: false},
		facebook_token: {type: 'string', nullable: false},
		facebook_profile_img: {type: 'string', nullable: true}
	},

	posts: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		emoji: {type: 'string', nullable: true, maxlength: 10},
		title: {type: 'string', nullable: false},
		votes: {type: 'integer', nullable: false, defaultTo: 0, unsigned: true},
		longitude: {type: 'float', nullable: false},
		latitude: {type: 'float', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
	},

	comments: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		post_id: {type: 'integer', nullable: false, unsigned: true},
		text: {type: 'string', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
	},

	votes: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		post_id: {type: 'integer', nullable: false, unsigned: true},
		vote_type: {type: 'boolean', nullable: false, defaultTo: true}
	}
};

module.exports = Schema;
