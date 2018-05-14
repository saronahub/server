const jwt = require('jsonwebtoken');
const { Router } = require('express');

const User = require('../models/user');
const logger = require('../lib/logger');
const { has, getToken, tokenExists } = require('../lib/util');

const loginController = require('../controllers/auth/login');
const resetController = require('../controllers/auth/reset');
const registerController = require('../controllers/auth/register');

const router = Router();

router.get('/', (req, res) => res.json({ success: true }));
router.post('/login', loginController);
router.post('/reset', resetController);
router.post('/register', registerController);

router.use('/', async (req, res, next) => {
  if (tokenExists(req.headers)) {
    const token = getToken(req.headers);

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      logger.error(e);
    }

    if (has.call(data, 'id')) {
      const { id } = data;

      const user = await User.findOne({ _id: id });

      if (user && user.id === id) {
        req.user = user.toJSON();

        return next();
      }
    }
  }

  return res.status(401).json({
    success: false,
    error: 'Expected valid token'
  });
});

module.exports = {
  router
};
