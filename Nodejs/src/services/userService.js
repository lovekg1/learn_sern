import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exists
                let user = await db.Users.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'OK'

                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = 'User not found'
                }

            } else {
                // return error
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.Users.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already in use'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }


        } catch (err) {
            reject(err)
        }
    })
}


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (err) {
            reject(err)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User not found'
                })
            }

            await db.Users.destroy({
                where: { id: userId },
            })
            resolve({
                errCode: 0,
                message: 'User is deleted'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                resolve({
                    errCode: 0,
                    message: 'User was edited successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}