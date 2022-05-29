const router = require('express').Router();
const { login, createUser, signOut } = require('../controllers/users');
const { registrationValidityCheck, loginValidityCheck } = require('../middlewares/validation');

router.post('/signin', loginValidityCheck, login);

router.post('/signup', registrationValidityCheck, createUser);

router.get('/signout', signOut);

module.exports = router;
