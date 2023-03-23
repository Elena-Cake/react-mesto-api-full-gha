const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const UnauthorizedError = require('../errors/Unauthorized');

// get
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError();
  }

  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV !== 'production' ? 'dev-secret' : JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError());
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
