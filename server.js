const express = require('express')
const connectDb = require('./middlewares/dB')
let PORT = 3000
const app = express()


const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const sellerRouter = require('./routes/sellerRoutes')


app.use(express.json())
connectDb()

// user routes
app.use('/user', userRouter)

// product routes
app.use('/product', productRouter)

//seller routes
app.use('/seller', sellerRouter)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
