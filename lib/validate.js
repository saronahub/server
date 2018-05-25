const { isInt, isEmail } = require('validator');

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

const validateEventRoom = function validateEventRoom(room) {
  if (!room) {
    return {
      success: false,
      error: 'Expected room parameter'
    };
  }

  if (!isInt(room)) {
    return {
      success: false,
      error: 'Expected room parameter to be an integer'
    };
  }

  if (room < 1 || room > 3) {
    return {
      success: false,
      error: 'Expected room parameter to be 1, 2 or 3'
    };
  }

  return {
    success: true
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateEventRoom
};
