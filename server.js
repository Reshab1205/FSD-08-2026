const express = require('express')
const connectDb = require('./middlewares/dB')
let PORT = 3000
const app = express()


const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')


app.use(express.json())
connectDb()

// user routes
app.use('/user', userRouter)

// product routes
app.use('/product', productRouter)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
