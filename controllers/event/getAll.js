const logger = require('../../lib/logger');
const Event = require('../../models/event');

const getAll = async function getAll(req, res) {
  let events;
  try {
    events = await Event.find({
      approved: true
    }, null, {
      sort: {
        start_time: -1
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
    data: events
  });
};

module.exports = getAll;
