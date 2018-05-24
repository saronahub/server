const logger = require('../../lib/logger');
const Event = require('../../models/event');

const newEvent = async function newEvent(req, res) {
  const {
    image,
    minAge,
    maxAge,
    endTime,
    startTime,
    room = 1,
    name = '',
    description = ''
  } = req.body;

  const { id, fullname } = req.user;

  if (!Number.isInteger(room)) {
    return res.json({
      success: false,
      error: 'Expected room parameter to be a number'
    });
  }

  const params = {
    room,
    name,
    image,
    description,
    end_time: endTime,
    start_time: startTime,
    age: {
      min: minAge,
      max: maxAge
    },
    author: {
      id,
      name: fullname
    }
  };

  let event;
  try {
    event = await new Event(params);
  } catch (e) {
    logger.error(e);

    return res.json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  try {
    await event.save();
  } catch (e) {
    logger.error(e);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  return res.json({
    success: true,
    data: event
  });
};

module.exports = newEvent;
