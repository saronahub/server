const getFile = async function getFile(params) {
  const {
    s3,
    Key = '',
    parameters = {},
    Bucket = process.env.Bucket
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
