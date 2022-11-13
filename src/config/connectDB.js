const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('learn_sern', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
})

let connectDB = async () => {
    try{
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    }catch(err){
        console.error('Unable to connect to the database:', err)
    }
}

module.exports = connectDB