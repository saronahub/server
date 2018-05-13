const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
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
  room: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String,
    default: ''
  },
  age: {
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
