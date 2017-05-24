var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
var helper = require('../helper/authJWT');

/* GET users listing. */
router.get('/', user.getAllUsers);

router.post('/', user.signup);

router.get('/:id', user.getUserById); 

router.delete('/:id', helper.verify, user.deleteUser);

module.exports = router;
