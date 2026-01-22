const express = require('express')
const connectDb = require('./middlewares/dB')


//Controllers
const userController = require('./controllers/userController')


const app = express()
let PORT = 3000
let PORT1 = 3001




app.use(express.json())
connectDb()


app.get('/', (req,res) => {
    res.send('Hello Bhopal')

})
app.get('/home', (req,res) => {
    res.send('Hello Bhopal , I am Homepage')

})

app.get('/about', (req,res) => {
    res.send('Hello About Page')
})


app.post('/register', userController.register)




app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})

app.listen(PORT1, () => {
    console.log(`Server started on ${PORT1}`)
})


