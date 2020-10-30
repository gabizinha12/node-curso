const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "gabilimajk12", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = connection;
