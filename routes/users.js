const router = require('express').Router();

const { patchProfile, getMe } = require('../controllers/users');
const { patchProfileValidityCheck } = require('../middlewares/validation');

router.get('/me', getMe);
router.patch('/me', patchProfileValidityCheck, patchProfile);

module.exports = router;
