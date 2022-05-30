const users = require('./users');
const movies = require('./movies');
const authorization = require('./authorization');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

module.exports = function (app) {
  app.use('/', authorization);
  app.use(auth);
  app.use('/users', users);
  app.use('/movies', movies);
  app.all('*', (req, res, next) => {
    next(new NotFoundError('По указанному пути ничего нет'));
  });
};
