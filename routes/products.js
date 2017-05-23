var express = require('express');
var router = express.Router();
var product = require('../controllers/productController');

/* SHOW PRODUCTS */
router.get('/', product.getAllProducts);

/* ADD PRODUCT */
router.post('/', product.addProduct);

/* DELETE PRODUCT */
router.delete('/:productId', product.deleteProduct);

/* UPDATE PRODUCT */
router.put('/:productId', product.updateProduct);

module.exports = router;
