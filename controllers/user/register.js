const { isNumeric, isMobilePhone } = require('validator');

const User = require('../../models/user');
const logger = require('../../lib/logger');

const { validateEmail, validatePassword } = require('../../lib/validate');

const register = async function register(req, res) {
  const {
    fbId = '',
    email = '',
    phone = '',
    password = '',
    last_name = '',
    first_name = ''
  } = req.body;

  let params = {};

  const [
    validatedEmail,
    validatedPassword
  ] = [validateEmail(email), validatePassword(password)];

  if (!validatedEmail.success) {
    return res.json(validatedEmail);
  }

  if (!validatedPassword.success) {
    return res.json(validatedPassword);
  }

  if (!isMobilePhone(phone, 'he-IL')) {
    return res.json({
      success: false,
      error: 'Expected valid phone number'
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

  const name = {
    last: last_name,
    first: first_name
  };

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

  return res.status(201).json({
    success: true
  });
};

module.exports = register;
