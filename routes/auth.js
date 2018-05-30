const { Router } = require('express');

const loginController = require('../controllers/auth/login');
const resetController = require('../controllers/auth/reset');
const registerController = require('../controllers/auth/register');

const router = Router();

router.post('/login', loginController);
router.post('/reset', resetController);
router.post('/register', registerController);

module.exports = {
  router
};
