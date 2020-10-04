const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection;