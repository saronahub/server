const { Router } = require('express');

const { router: user } = require('./user');
const { router: visit } = require('./visit');
const { router: event } = require('./event');
const { router: image } = require('./image');
const { router: version } = require('./version');

const authMiddleware = require('../lib/authMiddleware');

const router = Router();

router.use('/user', user);
// router.use('/visit', visit);
router.use('/event', event);
router.use('/versions', version);
router.use('/image', authMiddleware, image);

module.exports = {
  router
};

