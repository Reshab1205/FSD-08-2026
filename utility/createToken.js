const { configDotenv } = require('dotenv')
const jwt = require('jsonwebtoken')


configDotenv()

const secret_key = process.env.JWT_SECRET_KEY

const generateToken = (email, role) => {
    console.log('hiii', email,role)
   return jwt.sign({
        email:email,
        role: role
    }, secret_key, {expiresIn: "30d"})
}


module.exports = {generateToken}