const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 минутное окно
  max: 200,
  delayMs: 0,
  message: 'Вы сделали слишком много запросов за 2 минуты',
  headers: true,
});
