const mongoose = require('mongoose');

const logger = require('./logger');

const initDB = function initDB() {
  mongoose.connect(process.env.MONGO_URI, {
    autoIndex: false
  }, (error) => {
    if (error) {
      logger.error('Connection to MongoDB failed.');
      process.exit(error);
    }
  });
};

module.exports = initDB;
