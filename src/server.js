import express from 'express'
import initWebRoute from './route/web'
import viewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'

let app = express()

// app.use(bodyParser.json())

initWebRoute(app)
viewEngine(app)

// Test connect DB
connectDB()

require('dotenv').config() // config env
let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Backend Nodejs is running on port: ' + port)
})