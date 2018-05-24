const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
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
