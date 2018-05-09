const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
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
  collection: 'images',
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Image', imageSchema);
