import db from '../util/db';
import Sequelize from 'sequelize';

const Quan = db.define("quan", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

module.exports = Quan;