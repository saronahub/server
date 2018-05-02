const { isEmail } = require('validator');

const validateEmailPassword = function validateEmailPassword(email, password) {
  if (!isEmail(email)) {
    return {
      success: false,
      error: 'Expected valid email address'
    };
  }

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

module.exports = validateEmailPassword;
