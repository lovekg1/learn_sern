import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        })
    } catch (err) {
        console.error(err)
    }
}

let getAboutPage = (req, res) => {
    return res.render('hoanganh/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post with crud')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log(data)
    return res.render('displaycrud.ejs', {
        dataTable: data,
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        console.log(userData)
        return res.render('editcrud.ejs', {
            user: userData,
        })
    } else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displaycrud.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        await CRUDService.deleteUserById(userId)
        return res.send('Delete user successfully')
    } else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}