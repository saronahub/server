const { isEmail, isNumeric, isMobilePhone } = require('validator');

const User = require('../../models/user');
const logger = require('../../lib/logger');

const register = async function register(req, res) {
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
};

module.exports = register;
