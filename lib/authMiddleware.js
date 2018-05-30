const jwt = require('jsonwebtoken');

const User = require('../models/user');
const logger = require('../lib/logger');
const { has, getToken, tokenExists } = require('../lib/util');

const authMiddleware = async function authMiddleware(req, res, next) {
  if (tokenExists(req.headers)) {
    const token = getToken(req.headers);

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      logger.error(e);
    }

    if (has.call(data, 'id')) {
      const { id } = data;

      const user = await User.findOne({ _id: id });

      if (user && user.id === id) {
        req.user = user.toJSON();

        return next();
      }
    }
  }

  return res.status(403).json({
    success: false,
    error: 'Forbidden. Expected valid token.'
  });
};

module.exports = authMiddleware;
