var express = require('express');
var router = express.Router();
var Product = require('../controllers/productController');

/* ADD PRODUCT */
router.post('/', Product.addProduct);

/* SHOW PRODUCTS */
router.get('/', Product.getProduct);

/* DELETE PRODUCT */
router.delete('/:productId', Product.deleteProduct);

/* UPDATE PRODUCT */
router.put('/:productId', Product.updateProduct);

module.exports = router;
