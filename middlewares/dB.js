const mongoose = require('mongoose')

 const {configDotenv}  = require('dotenv')

 configDotenv()

const url = process.env.DB_URL


const connectDb = async () => {
    try {
       const db = await mongoose.connect(url)
       console.log('Db connected')

    } catch(err) {
        return console.log('Db Error',err)
    }
}

module.exports = connectDb