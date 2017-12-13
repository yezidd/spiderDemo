import db from '../util/db';
import Sequelize from 'sequelize';

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
    unique: true,
    get() {
      return "hello " + this.getDataValue("token");
    }
  }
}, {
  timestamps: true,
  logging:console.log,

});

module.exports = User;