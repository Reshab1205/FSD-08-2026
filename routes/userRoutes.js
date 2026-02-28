const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController');
const handleUpload = require('../utility/fileUploadHandling');
const { protect } = require('../middlewares/auth');


router.get('/', (req,res) => {
    res.send('Hello Bhopal')

})
//public routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login-with-otp', userController.loginWithOtp)

//protected routes
router.post('/update/:id', protect,  userController.updateUser)
router.post('/delete/:id', protect, userController.deleteUser)
router.get('/users', userController.getUsers)
router.post('/upload', handleUpload.single("file"), userController.uploadPDf)
router.post('/send-mail', userController.sendMail)







module.exports = router