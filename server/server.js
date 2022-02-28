const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('HELLO')
})

/* const connectToDb = require('./config/db')
connectToDb() */

const port = process.env.PORT || 8080

app.listen(port, ()=> console.log('server is up and running at port', port))