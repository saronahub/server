const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const logger = require('../../lib/logger');

const { validateEmail, validatePassword } = require('../../lib/validate');

const login = async function login(req, res) {
  const {
    email = '',
    password = ''
  } = req.body;

  const [
    emailResponse,
    passwordResponse
  ] = [validateEmail(email), validatePassword(password)];

  if (!emailResponse.success) {
    return res.json(emailResponse);
  }

  if (!passwordResponse.success) {
    return res.json(passwordResponse);
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
