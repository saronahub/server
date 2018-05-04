const { isEmail } = require('validator');

const validateEmail = function validateEmail(email) {
  if (!isEmail(email)) {
    return {
      success: false,
      error: 'Expected valid email address'
    };
  }

  return {
    success: true
  };
};

const validatePassword = function validatePassword(password) {
  if (!password) {
    return {
      success: false,
      error: 'Expected password parameter'
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: 'Expected password length to be at least 8 characters'
    };
  }

  return {
    success: true
  };
};

module.exports = {
  validateEmail,
  validatePassword
};
