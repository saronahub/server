const multer = require('multer');

const { Router } = require('express');

const getAllController = require('../controllers/image/getAll');
const uploadController = require('../controllers/image/upload');
const getSomeController = require('../controllers/image/getSome');

const router = Router();

const upload = multer();

router.get('/', getAllController);
router.get('/:start/to/:end', getSomeController);
router.post('/', upload.single('image'), uploadController);

module.exports = {
  router
};
