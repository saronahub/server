const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const logger = require('../lib/logger');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
  collection: 'users',
  toJSON: {
    virtuals: true
  }
});

userSchema.pre('save', async function (next) {
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

userSchema.methods.comparePassword = async function (passwd) {
  let isMatch;
  try {
    isMatch = await bcrypt.compare(passwd, this.password);
  } catch (e) {
    logger.error(e);
    return false;
  }

  return isMatch;
};

userSchema.virtual('fullname').get(function () {
  const { first, last } = this.name;

  // filter undefined, null and empty string
  return [first, last].filter(v => !!v).join(' ');
});

module.exports = mongoose.model('User', userSchema);
