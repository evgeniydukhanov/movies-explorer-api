const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidityCheck, deleteMovieValidityCheck } = require('../middlewares/validation');

router.post('/', createMovieValidityCheck, createMovie);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovieValidityCheck, deleteMovie);

module.exports = router;
