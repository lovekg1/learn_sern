import db from '../models/index'

let getHomePage = async (req, res) => {
    try{
        let data = await db.Users.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        })
    }catch(err){
        console.error(err)
    }
}

let getAboutPage = (req, res) => {
    return res.render('hoanganh/about.ejs')
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}