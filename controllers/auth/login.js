const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');

const User = require('../../models/user');
const logger = require('../../lib/logger');

const login = async function login(req, res) {
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
  }, process.env.JWT_SECRET, {
    expiresIn: '1y'
  });

  return res.json({
    success: true,
    data: {
      token
    }
  });
};

module.exports = login;
