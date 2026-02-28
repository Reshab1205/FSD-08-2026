const express = require('express')
const router = express.Router();

const productController = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middlewares/auth');


router.post('/create-product', protect, authorizeRoles('seller'),  productController.createProduct)
router.post('/find-product-by-code', productController.findProductByCode)


module.exports = router