var config;
if (process.env.NODE_ENV === "development") {
  config = require("../config/config.dev");
}
else {
  config = require("../config/config.pro");
}

const Sequelize = require('sequelize');
const db = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone:'+08:00'
});

module.exports = db;