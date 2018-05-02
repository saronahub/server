const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { isEmail, isMobilePhone } = require('validator');

const User = require('../models/user');
const logger = require('../lib/logger');
const { getToken, isNumeric, tokenExists } = require('../lib/util');

const router = Router();

router.post('/register', async (req, res) => {
  const {
    fbId = '',
    name = {},
    email = '',
    phone = '',
    password = '',
  } = req.body;

  name.first = name.first || '';
  name.last = name.last || '';

  let params = {};

  if (!isEmail(email)) {
    return res.json({
      success: false,
      error: 'Expected valid email address'
    });
  }

  if (!isMobilePhone(phone, 'he-IL')) {
    return res.json({
      success: false,
      error: 'Expected valid phone number'
    });
  }

  if (!password) {
    return res.json({
      success: false,
      error: 'Expected password parameter'
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      error: 'Expected password length to be at least 8 characters'
    });
  }

  if (fbId) {
    if (!isNumeric(fbId)) {
      return res.json({
        success: false,
        error: 'Expected valid facebook id'
      });
    }

    params.fbId = fbId;
    params.isFBUser = true;
  }

  if (name.first.length < 1 || name.last.length < 1) {
    return res.json({
      success: false,
      error: 'Expected name.first or name.last to be at least 1 character'
    });
  }


  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        success: false,
        error: 'Email address already exists.'
      });
    }
  } catch (e) {
    logger.error(`Error finding user: ${e}`);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  params = {
    name,
    email,
    phone,
    password,
    ...params
  };

  const user = new User(params);

  try {
    await user.save();
  } catch (e) {
    logger.error(`Error saving new user: ${e}`);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  return res.json({
    success: true
  });
});

router.post('/login', async (req, res) => {
  const {
    email = '',
    password = ''
  } = req.body;

  if (!isEmail(email)) {
    return res.json({
      success: false,
      error: 'Expected valid email address'
    });
  }

  if (!password) {
    return res.json({
      success: false,
      error: 'Expected password parameter'
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      error: 'Expected password length to be at least 8 characters'
    });
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (e) {
    logger.error(`Error finding user: ${e}`);

    return res.status(500).json({
      success: false,
      error: 'Unexpected server error'
    });
  }

  if (!user) {
    return res.json({
      success: false,
      error: 'Email address or password is incorrect'
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.json({
      success: false,
      error: 'Email address or password is incorrect'
    });
  }

  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET);

  return res.json({
    token,
    success: true
  });
});

router.use('/', async (req, res, next) => {
  if (tokenExists(req.headers)) {
    const token = getToken(req.headers);

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      logger.error(e);
    }

    if (data && data.id) {
      const { id } = data;

      const user = await User.findOne({ _id: id });

      if (user && user.id === id) {
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
