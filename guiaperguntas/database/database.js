const Sequelize = require("sequelize")

const connection = new Sequelize('guiaperguntas', 'root', null, {
        host: 'localhost',
        dialect: 'mysql',
});

module.exports = connection;