const getFile = async function getFile(params) {
  const {
    S3_BUCKET: Bucket
  } = process.env;

  const {
    s3,
    Key = '',
    parameters = {}
  } = params;

  if (!s3) {
    throw new Error('Expected client');
  }

  let object;
  try {
    object = await s3.getObject({
      Key,
      Bucket,
      ...parameters
    }).promise();
  } catch (e) {
    object = e;
  }

  return object;
};

module.exports = getFile;
