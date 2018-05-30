const logger = require('../../lib/logger');
const Event = require('../../models/event');

const getAll = async function getAll(req, res) {
  const events = {
    1: [],
    2: [],
    3: []
  };

  let eventsFromDB;
  try {
    eventsFromDB = await Event.find({
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

  for (let i = 0; i < eventsFromDB.length; i += 1) {
    const event = eventsFromDB[i];
    const { room } = event;

    events[room] = event;
  }

  return res.json({
    success: true,
    data: events
  });
};

module.exports = getAll;
