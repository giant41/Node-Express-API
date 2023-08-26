const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Node API, good Night')
})

app.listen(3100, () => {
    console.log("Node API app is running on  port 3100")
})