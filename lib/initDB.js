const { connect } = require('mongoose');

const logger = require('./logger');

const initDB = async function initDB() {
  try {
    await connect(process.env.MONGO_URI, {
      autoIndex: false,
      useMongoClient: true,
    });
  } catch (e) {
    logger.error('Connection to MongoDB failed.');
    process.exit(e);
  }
};

module.exports = initDB;
