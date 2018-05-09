const sharp = require('sharp');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const logger = require('../../lib/logger');
const getFile = require('../../lib/getFile');
const Image = require('../../models/image');
const { mimeTypes } = require('../../lib/util');

const ACL = 'public-read';
const ContentType = 'image/jpeg';

const upload = async function upload(req, res) {
  const {
    S3_ID,
    S3_SECRET,
    S3_BUCKET: Bucket
  } = process.env;

  const { id, name } = req.user;
  const { description } = req.body;
  const { buffer, mimetype } = req.file;

  const s3 = new AWS.S3({
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET
  });

  if (!mimeTypes.includes(mimetype)) {
    return res.json({
      success: false,
      error: 'Unsupported file type'
    });
  }

  const Body = await sharp(buffer).jpeg({
    quality: 85
  }).toBuffer();

  // generate checksum
  const hash = crypto.createHash('sha1').update(Body).digest('hex');
  const Key = `${hash}.jpg`;

  const s3Object = await getFile({ s3, Key });

  if (s3Object.code && s3Object.code !== 'NoSuchKey') {
    logger.error(s3Object);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  if (s3Object.code && s3Object.code === 'NoSuchKey') {
    try {
      await s3.putObject({
        Key,
        ACL,
        Body,
        Bucket,
        ContentType,
      }).promise();
    } catch (e) {
      logger.error(e);

      return res.status(500).json({
        success: false,
        error: 'Unexpected server error'
      });
    }
  }

  const url = `${Bucket}/${Key}`;
  const nameString = Object.values(name).filter(v => v !== undefined).join(' ');

  const image = new Image({
    url,
    description,
    author: {
      id,
      name: nameString
    }
  });

  try {
    await image.save();
  } catch (e) {
    logger.error(e);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  return res.json({
    success: true,
    data: image
  });
};

module.exports = upload;
