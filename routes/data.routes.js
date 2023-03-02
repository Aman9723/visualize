const router = require('express').Router();
const verify = require('../middlewares/verify');
const dataControllers = require('../controllers/dataControllers');

router.use(verify);

// @route - /data
router.get('/', dataControllers.getData);

module.exports = router;
