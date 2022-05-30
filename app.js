require('dotenv').config();
const express = require('express');

const { errors } = require('celebrate');

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
const cors = require('./middlewares/cors');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errMessages } = require('./utils/constants');

app.use(cors);

const errorCatcher = require('./errors/errorCatcher');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(errMessages.crashTest);
  }, 0);
});

app.use('/', limiter);

routes(app);

app.use(errorLogger);

app.use(errors());
app.use(errorCatcher);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
