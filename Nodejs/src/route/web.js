import express from 'express'
import controller from '../controllers/controller'
import userController from '../controllers/userController'

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

    // call API
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    return app.use('/', router)
}

module.exports = initWebRoute