const has = Object.prototype.hasOwnProperty;

const tokenExists = function tokenExists(headers = {}) {
  return has.call(headers, 'authorization');
};

const getToken = function getToken(headers) {
  const parts = headers.authorization.split(' ');

  return parts.length === 2 ? parts[1] : null;
};

module.exports = {
  has,
  getToken,
  tokenExists
};
