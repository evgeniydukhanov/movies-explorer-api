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
  'http://lookatme.nomoredomains.xyz',
  'https://lookatme.nomoredomains.xyz',
];

const errMessages = {
  linkError: 'Это поле должно содержать ссылку',
  dataError: 'Переданы неккоректные данные',
  movieNotFoundError: 'Фильм не найден',
  deleteMovieError: 'Вы не можете удалить чужой сохраненный фильм',
  userNotFoundError: 'Указанный пользователь не найден',
  conflictError: 'Пользователь с таким EMAIL уже зарегистрирован',
  authorizationError: 'Ошибка авторизации',
  crashTest: 'Сервер сейчас упадёт',
  loginError: 'Неправильные почта ли пароль',
  wrongPathError: 'По указанному пути ничего нет',
};

module.exports = { allowedCors, errMessages };
