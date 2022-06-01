const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');
const { errMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthorizationError(errMessages.loginError),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthorizationError(errMessages.loginError),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
