const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    first: {
      type: String,
      require: true
    },
    last: {
      type: String,
      require: true
    },
  },
  phone: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  picture: {
    type: String,
    default: ''
  },
  isFBUser: {
    type: Boolean,
    default: false
  },
  fbId: String
}, {
  id: true,
  collection: 'users'
});

module.exports = model('User', userSchema);
