var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transactionController');

/* ADD TRANSACTION */
router.post('/', transaction.addTransaction);

/* GET TRANSACTIONS */
router.get('/', transaction.getTransaction);

/* GET TRANSACTIONS BY YEAR */
router.get('/:year', transaction.getTransactionByDate);

/* GET TRANSACTIONS BY DATE */
router.get('/:month/:year', transaction.getTransactionByDate);

/* GET TRANSACTIONS BY DATE */
router.get('/:date/:month/:year', transaction.getTransactionByDate);

/* DELETE TRANSACTION */
router.delete('/:id', transaction.deleteTransaction);

module.exports = router;
