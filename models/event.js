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
  room: {
    type: Number,
    default: 0
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
  collection: 'events'
});

module.exports = model('Event', userSchema);
