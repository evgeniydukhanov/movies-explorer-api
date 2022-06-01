const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { errMessages } = require('../utils/constants');

const { JWT_SECRET_KEY = 'test' } = process.env;
module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    return next(new AuthorizationError(errMessages.authorizationError));
  }
  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError(errMessages.authorizationError));
  }
  req.user = payload;
  return next();
};
