import express from 'express'
import initWebRoute from './route/web'
import viewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
import cors from 'cors'

let app = express()

// CORS - Cross-origin resource sharing
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080', 'http://localhost:3000']
}))

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoute(app)
viewEngine(app)

// Test connect DB
connectDB()

require('dotenv').config() // config env
let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Backend Nodejs is running on port: ' + port)
})
