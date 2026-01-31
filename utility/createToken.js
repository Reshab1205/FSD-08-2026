const { configDotenv } = require('dotenv')
const jwt = require('jsonwebtoken')


configDotenv()

const secret_key = process.env.JWT_SECRET_KEY

const generateToken = (email, id) => {
    console.log('hiii', email,id)
   return jwt.sign({
        email:email,
        id: id
    }, secret_key, {expiresIn: "30d"})
}


module.exports = {generateToken}