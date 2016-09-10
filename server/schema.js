var Schema = {
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		facebook_id: {type: 'string', nullable: false, unique: true},
		facebook_name: {type: 'string', nullable: false},
		facebook_token: {type: 'string', nullable: false},
		facebook_profile_img: {type: 'string', nullable: true}
	},

	posts: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		likes: {type: 'integer', nullable: false, defaultTo: 0, unsigned: true},
		geojson_id: {type: 'string', nullable: false},
    created_at: {type: 'dateTime', nullable: false},
    updated_at: {type: 'dateTime', nullable: true}
	},

	comments: {
		id: {type: 'increments', nullable: false, primary: true},
		post_id: {type: 'integer', nullable: false, unsigned: true},
	}
};

module.exports = Schema;
