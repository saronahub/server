const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      required: true
    }
  },
  room: {
    type: Number,
    default: 1
  },
  end_time: {
    type: Date,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  age_limit: {
    min: Number,
    max: Number
  },
  participants: {
    type: [String],
    default: []
  },
  approved: {
    type: Boolean,
    default: false
  },
}, {
  id: true,
  collection: 'events',
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
