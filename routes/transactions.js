var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transactionController');

/* ADD TRANSACTION */
router.post('/', transaction.addTransaction);

/* GET TRANSACTIONS */
router.get('/', transaction.getTransaction);

module.exports = router;