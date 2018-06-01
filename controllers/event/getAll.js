const logger = require('../../lib/logger');
const Event = require('../../models/event');

const getAll = async function getAll(req, res) {
  const events = {
    1: [],
    2: [],
    3: []
  };

  const fields = 'id name room author image age_limit end_date start_date description participants';

  let eventsFromDB;
  try {
    eventsFromDB = await Event.find({
      approved: true,
      end_date: {
        $gte: new Date()
      }
    }, fields, {
      sort: {
        start_date: -1
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
    const event = eventsFromDB[i].toJSON();
    const { room } = event;

    // remove unnecessary fiels
    delete event._id;
    delete event.room;

    events[room].push(event);
  }

  return res.json({
    success: true,
    data: events
  });
};

module.exports = getAll;
