const { Router } = require('express');

const loginController = require('../controllers/user/login');
const resetController = require('../controllers/user/reset');
const registerController = require('../controllers/user/register');

const router = Router();

router.post('/login', loginController);
router.post('/reset', resetController);
router.post('/register', registerController);

module.exports = {
  router
};
