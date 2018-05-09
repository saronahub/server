const multer = require('multer');

const { Router } = require('express');

const uploadController = require('../controllers/image/upload');

const router = Router();

const upload = multer();

router.post('/upload', upload.single('image'), uploadController);

module.exports = {
  router
};
