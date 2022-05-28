/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  const owner = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы неккоректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .catch(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Вы не можете удалить чужой сохраненный фильм');
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then((movieData) => {
          res.send({ data: movieData });
        })
        .catch(next);
    })
    .catch(next);
};
