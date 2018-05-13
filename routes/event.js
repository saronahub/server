const { Router } = require('express');

const getAllController = require('../controllers/event/getAll');

const router = Router();

router.get('/', getAllController);

module.exports = {
  router
};
