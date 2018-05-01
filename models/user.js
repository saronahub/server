const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const logger = require('../lib/logger');

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

userSchema.pre('save', async (next) => {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    let salt;
    try {
      salt = await bcrypt.genSalt(10);
    } catch (e) {
      return next(e);
    }

    let hash;
    try {
      hash = await bcrypt.hash(user.password, salt);
    } catch (e) {
      return next(e);
    }

    user.password = hash;
    return next();
  }

  return next();
});

userSchema.methods.comparePassword = async (passwd) => {
  let isMatch;
  try {
    isMatch = await bcrypt.compare(passwd, this.password);
  } catch (e) {
    logger.error(e);
    return false;
  }

  return isMatch;
};

module.exports = model('User', userSchema);
