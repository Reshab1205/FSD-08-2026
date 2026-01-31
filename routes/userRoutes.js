const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')


router.get('/', (req,res) => {
    res.send('Hello Bhopal')

})

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login-with-otp', userController.loginWithOtp)
router.post('/update/:id', userController.updateUser)
router.post('/delete/:id', userController.deleteUser)







module.exports = router