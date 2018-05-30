const { Router } = require('express');

const authMiddleware = require('../lib/authMiddleware');
const getAllController = require('../controllers/event/getAll');
const newEventController = require('../controllers/event/newEvent');

const router = Router();

// Public routes
router.get('/', getAllController);

// Private routes, requires valid token
router.use(authMiddleware);
router.post('/', newEventController);

module.exports = {
  router
};
