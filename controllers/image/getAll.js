const logger = require('../../lib/logger');
const Image = require('../../models/image');

const getAll = async function getAll(req, res) {
  const { end, start } = req.params;

  const skip = Math.abs(start) || 0;
  const limit = Math.abs(end) - skip || 10;

  let images;
  try {
    images = await Image.find({}, null, {
      skip,
      limit,
      sort: {
        timestamp: -1
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
