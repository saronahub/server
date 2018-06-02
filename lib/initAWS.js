const AWS = require('aws-sdk');

const s3 = function s3() {
  const {
    AWS_ID,
    AWS_SECRET,
    AWS_REGION
  } = process.env;

  const credentials = {
    region: AWS_REGION,
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET
  };

  global.s3 = new AWS.S3(credentials);

  global.apiGateway = new AWS.APIGateway(credentials);
};

module.exports = s3;
