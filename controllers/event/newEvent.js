const logger = require('../../lib/logger');
const Event = require('../../models/event');

const { validateEventRoom } = require('../../lib/validate');

const newEvent = async function newEvent(req, res) {
  const {
    image,
    min_age,
    max_age,
    end_time,
    start_time,
    room = 1,
    name = '',
    description = ''
  } = req.body;

  const { id, fullname } = req.user;

  const validatedRoom = validateEventRoom(room);

  if (!validatedRoom.success) {
    return res.json(validatedRoom);
  }

  const params = {
    room,
    name,
    image,
    description,
    end_time,
    start_time,
    age_limit: {
      min: min_age,
      max: max_age
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
