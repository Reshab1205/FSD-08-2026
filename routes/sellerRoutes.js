const express = require('express')

const router = express.Router()
const sellerController = require('../controllers/sellerController')
const { protect, authorizeRoles } = require('../middlewares/auth')

router.post('/create-seller', protect, authorizeRoles("Admin"), sellerController.createSeller)
router.post('/get-all-products/:id', sellerController.getProductsWithSellerDetails)
// router.post('/seller-login', sellerController.sellerLogin)
router.post('/update-seller', sellerController.updateSeller)
router.post('/delete-seller', sellerController.deleteSeller)
router.get('/get-all-sellers', protect, authorizeRoles("Admin"), sellerController.getAllSellers)
router.post('/get-seller', sellerController.getSellerById)

module.exports = router