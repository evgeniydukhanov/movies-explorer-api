/* eslint-disable func-names */
const express = require('express');

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorCatcher = require('./errors/errorCatcher');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://localhost:3000',
  'https://127.0.0.1:3000',
  'https://localhost:3000',
  'https://127.0.0.1:3000',
  'http://localhost:3000',
  'http://localhost:3030',
];

// eslint-disable-next-line prefer-arrow-callback
app.use(function (req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
app.use('/signup', require('./routes/authorization'));
app.use('/signin', require('./routes/authorization'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('По указанному пути ничего нет'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorCatcher);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
