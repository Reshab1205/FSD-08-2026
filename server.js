const express = require('express')
const connectDb = require('./middlewares/dB')
let PORT = 3000
const app = express()


const userRouter = require('./routes/userRoutes')


app.use(express.json())
connectDb()

//routes
app.use('/user', userRouter)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
