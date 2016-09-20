var Schema = {

  // Users Table
  users: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    user_name: {
      type: 'string',
      nullable: false
    },
    user_avatar_url: {
      type: 'string',
      nullable: false
    },
    anonymous: {
      type: 'boolean',
      nullable: false,
      defaultTo: true
    },
    facebook_id: {
      type: 'string',
      nullable: false,
      unique: true
    },
    facebook_name: {
      type: 'string',
      nullable: false
    },
    facebook_token: {
      type: 'string',
      nullable: false
    },
    facebook_profile_img: {
      type: 'string',
      nullable: true
    }
  },

  // Drops Table
  posts: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    user_id: {
      type: 'integer',
      nullable: false,
      unsigned: true
    },
    emoji: {
      type: 'string',
      nullable: true,
      maxlength: 10
    },
    title: {
      type: 'string',
      nullable: false
    },
    video: {
      type: 'string',
      nullable: true
    },
    image: {
      type: 'string',
      nullable: true
    },
    sound: {
      type: 'string',
      nullable: true
    },
    longitude: {
      type: 'float',
      nullable: false
    },
    latitude: {
      type: 'float',
      nullable: false
    },
    created_at: {
      type: 'string',
      nullable: false
    },
    updated_at: {
      type: 'string',
      nullable: true
    }
  },

  // Comments Table
  comments: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    user_id: {
      type: 'integer',
      nullable: false,
      unsigned: true
    },
    post_id: {
      type: 'integer',
      nullable: false,
      unsigned: true
    },
    text: {
      type: 'string',
      nullable: false
    },
    created_at: {
      type: 'string',
      nullable: false
    },
    updated_at: {
      type: 'string',
      nullable: true
    }
  },

  // Votes Table
  votes: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    user_id: {
      type: 'integer',
      nullable: false,
      unsigned: true
    },
    post_id: {
      type: 'integer',
      nullable: false,
      unsigned: true
    },
    vote_type: {
      type: 'boolean',
      nullable: false,
      defaultTo: true
    }
  }
};

module.exports = Schema;
