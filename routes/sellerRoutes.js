const express = require('express')

const router = express.Router()
const sellerController = require('../controllers/sellerController')

router.post('/create-seller', sellerController.createSeller)
router.post('/get-all-products/:id', sellerController.getAllProductsOfASeller)
router.post('/seller-login', sellerController.sellerLogin)
router.post('/update-seller', sellerController.updateSeller)
router.post('/delete-seller', sellerController.deleteSeller)
router.get('/get-all-sellers', sellerController.getAllSellers)
router.post('/get-seller', sellerController.getSellerById)

module.exports = router