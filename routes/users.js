var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
var helper = require('../helper/authJWT');

/* GET users listing. */
router.get('/', user.getAllUsers);

router.post('/', helper.verify, user.signup)

module.exports = router;
