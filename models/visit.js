const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
  collection: 'visits'
});

module.exports = model('Visit', userSchema);
