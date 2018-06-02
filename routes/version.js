const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  const { apiGateway } = global;
  const { AWS_REST_API_ID } = process.env;

  let stages;
  try {
    stages = await apiGateway.getStages({
      restApiId: AWS_REST_API_ID
    }).promise();
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  const versions = [];

  for (let i = 0; i < stages.item.length; i += 1) {
    const version = stages.item[i].stageName;

    versions.push(version);
  }

  return res.json({
    success: true,
    data: versions
  });
});

module.exports = {
  router
};
