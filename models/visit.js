const mongoose = require('mongoose');

const { Schema } = mongoose;

const visitSchema = new Schema({
  visitor: {
    type: String,
    require: true
  },
  date: {
    exit: Date,
    entrance: Date
  },
  totalTime: Number
}, {
  id: true,
  collection: 'visits',
  toJSON: {
    virtuals: true
  }
});

module.exports = mongoose.model('Visit', visitSchema);
