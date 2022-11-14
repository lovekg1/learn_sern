import express from 'express'
import controller from '../controllers/controller'

let router = express.Router()

let initWebRoute = (app) => {
    router.get('/', controller.getHomePage)

    router.get('/about', controller.getAboutPage)

    router.get('/crud', controller.getCRUD)

    router.post('/post-crud', controller.postCRUD)


    return app.use('/', router)
}

module.exports = initWebRoute