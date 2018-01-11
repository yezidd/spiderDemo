'use strict';

var _db = require('../util/db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quan = _db2.default.define("quan", {
  id: {
    type: _sequelize2.default.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: _sequelize2.default.STRING,
    unique: true,
    allowNull: false
  },
  time: {
    type: _sequelize2.default.DATE,
    allowNull: true
  }
});

module.exports = Quan;