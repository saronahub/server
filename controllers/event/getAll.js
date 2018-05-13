const logger = require('../../lib/logger');
const Event = require('../../models/event');

const getAll = async function getAll(req, res) {
  let images;
  try {
    images = await Event.find({}, null, {
      sort: {
        date: -1
      }
    });
  } catch (e) {
    logger.error(e);

    return res.json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  return res.json({
    success: true,
    data: images
  });
};

module.exports = getAll;
