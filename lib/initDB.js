const { connect } = require('mongoose');

const logger = require('./logger');

const initDB = async function initDB() {
  connect(process.env.MONGO_URI, {
    autoIndex: false,
    useMongoClient: true
  }, (error) => {
    if (error) {
      logger.error('Connection to MongoDB failed.');
      process.exit(error);
    }
  });
};

module.exports = initDB;
