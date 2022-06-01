const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минутное окно
  max: 300,
  delayMs: 0,
  message: 'Вы сделали слишком много запросов за 15 минут',
  headers: true,
});
