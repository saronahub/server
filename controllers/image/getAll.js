const Image = require('../../models/image');

const getAll = async function getAll(req, res) {
  const { end, start } = req.params;

  const skip = Math.abs(start) || 0;
  const limit = Math.abs(end) - skip || 10;

  const images = await Image.find({}, null, {
    skip,
    limit,
    sort: {
      timestamp: -1
    }
  });

  return res.json({
    success: true,
    data: images
  });
};

module.exports = getAll;
