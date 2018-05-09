const multer = require('multer');

const { Router } = require('express');

const getAllController = require('../controllers/image/getAll');
const uploadController = require('../controllers/image/upload');

const router = Router();

const upload = multer();

router.get('/:start/:end', getAllController);
router.post('/upload', upload.single('image'), uploadController);

module.exports = {
  router
};
