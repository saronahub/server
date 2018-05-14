const { Router } = require('express');

const { router: user } = require('./user');
const { router: auth } = require('./auth');
const { router: visit } = require('./visit');
const { router: event } = require('./event');
const { router: image } = require('./image');

const router = Router();


router.use(auth);
// The following routes can not be accessed without a valid token
// router.use('/user', user);
// router.use('/visit', visit);
router.use('/event', event);
router.use('/image', image);

module.exports = {
  router
};

