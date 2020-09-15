const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;