var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');

/* GET users listing. */
router.get('/', user.getAllUsers);

router.post('/', user.signup)

module.exports = router;
