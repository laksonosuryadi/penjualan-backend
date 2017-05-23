var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signin', user.signin);

module.exports = router;
