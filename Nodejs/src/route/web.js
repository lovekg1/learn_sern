import express from 'express'
import controller from '../controllers/controller'

let router = express.Router()

let initWebRoute = (app) => {
    router.get('/', controller.getHomePage)

    router.get('/about', controller.getAboutPage)

    router.get('/crud', controller.getCRUD)

    router.post('/post-crud', controller.postCRUD)

    router.get('/get-crud', controller.displayCRUD)

    router.get('/edit-crud', controller.editCRUD)

    router.post('/put-crud', controller.putCRUD)

    router.get('/delete-crud', controller.deleteCRUD)



    return app.use('/', router)
}

module.exports = initWebRoute