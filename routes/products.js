var express = require('express');
var router = express.Router();
var product = require('../controllers/productController');
var helper = require('../helper/authJWT');

/* SHOW PRODUCTS */
router.get('/', product.getAllProducts);

/* ADD PRODUCT */
router.post('/', helper.verify, product.addProduct);

/* DELETE PRODUCT */
router.delete('/:productId', helper.verify, product.deleteProduct);

/* UPDATE PRODUCT */
router.put('/:productId', helper.verify, product.updateProduct);

module.exports = router;
