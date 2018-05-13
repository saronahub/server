const multer = require('multer');

const { Router } = require('express');

const getAllController = require('../controllers/image/getAll');
const uploadController = require('../controllers/image/upload');

const router = Router();

const upload = multer();

router.get('/:start/to/:end', getAllController);
router.post('/', upload.single('image'), uploadController);

module.exports = {
  router
};
