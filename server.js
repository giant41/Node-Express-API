require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3100
const MONGO_URL = process.env.MONGO_URL
const PRONTEND = process.env.PRONTEND

const corsOptions = {
    origin: PRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// API Root
app.use('/api/product', productRoute);

app.get('/', (req, res) => {
    res.send('Hello Node API')
    // throw new error('error note')
})

app.use(errorMiddleware)

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Node API app is running on  port ${PORT}`)
    })    
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
