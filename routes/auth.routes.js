const router = require('express').Router();
const authControllers = require('../controllers/authControllers');

// @route - /signup
router.post('/signup', authControllers.signup);

// @route - /login
router.post('/login', authControllers.login);

module.exports = router;
