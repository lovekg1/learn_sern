import express from 'express'
import controller from '../controllers/controller'

let router = express.Router()

let initWebRoute = (app) => {
    router.get('/', controller.getHomePage)

    router.get('/about', controller.getAboutPage)

    return app.use('/', router)
}

module.exports = initWebRoute