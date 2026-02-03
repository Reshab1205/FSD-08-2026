const express = require('express')
const router = express.Router();

const productController = require('../controllers/productController')


router.post('/create-product', productController.createProduct)
router.post('/find-product-by-code', productController.findProductByCode)


module.exports = router