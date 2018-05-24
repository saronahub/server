const { Router } = require('express');

const getAllController = require('../controllers/event/getAll');
const newEventController = require('../controllers/event/newEvent');

const router = Router();

router.get('/', getAllController);
router.post('/', newEventController);

module.exports = {
  router
};
