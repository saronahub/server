const AWS = require('aws-sdk');

const s3 = function s3() {
  const {
    S3_ID,
    S3_SECRET,
  } = process.env;

  global.s3 = new AWS.S3({
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET
  });
};

module.exports = s3;
