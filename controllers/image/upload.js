const sharp = require('sharp');
const crypto = require('crypto');
const AWS = require('aws-sdk');

const logger = require('../../lib/logger');
const Image = require('../../models/image');

const ACL = 'public-read';
const ContentType = 'image/jpeg';
const allowedMimeTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/tiff',
  'image/x-tiff',
  'image/svg+xml',
];

const upload = async function upload(req, res) {
  const {
    S3_ID,
    S3_SECRET,
    S3_BUCKET: Bucket
  } = process.env;

  const { id, name } = req.user;
  const { description } = req.body;
  const { buffer, mimetype, originalname } = req.file;

  const s3 = new AWS.S3({
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET
  });

  if (!allowedMimeTypes.includes(mimetype)) {
    return res.json({
      success: false,
      error: 'Unsupported file type'
    });
  }

  const Body = await sharp(buffer).jpeg({
    quality: 85
  }).toBuffer();

  // generate unique file name
  const hash = crypto.createHash('sha1')
    .update(`${originalname}.${id}.${Date.now()}`).digest('hex');
  const Key = `${hash}.jpg`;

  logger.info(mimetype);

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
