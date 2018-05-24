const logger = require('../../lib/logger');
const Image = require('../../models/image');

const getAll = async function getAll(req, res) {
  let images;
  try {
    images = await Image.find({}, null, {
      sort: {
        timestamp: -1
      },
      type: 'upload'
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
