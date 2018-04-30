const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  author: {
    id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  description: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    require: true
  },
  timestamp: {
    type: Date,
    require: true,
    default: new Date()
  }
}, {
  id: true,
  collection: 'images'
});

module.exports = model('Image', userSchema);
