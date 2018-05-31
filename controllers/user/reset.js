const User = require('../../models/user');
const logger = require('../../lib/logger');

const { validateEmail } = require('../../lib/validate');

const reset = async function reset(req, res) {
  const {
    email = ''
  } = req.body;

  const validatedEmail = validateEmail(email);

  if (!validatedEmail.success) {
    return res.json(validatedEmail);
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

  return res.json({
    success: true,
    data: {
      message: `An email has been sent to ${email} with further instructions`
    }
  });
};

module.exports = reset;
