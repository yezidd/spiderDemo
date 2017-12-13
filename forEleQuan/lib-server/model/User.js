'use strict';

var _db = require('../util/db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _db2.default.define("user", {
  id: {
    type: _sequelize2.default.INT,
    autoIncrement: true,
    primaryKey: true
  },
  phone: {
    type: _sequelize2.default.STRING,
    unique: true
  },
  password: {
    type: _sequelize2.default.STRING
  },
  token: {
    type: _sequelize2.default.STRING,
    unique: true,
    get: function get() {
      return "hello " + this.getDataValue("token");
    }
  }
}, {
  timestamps: true,
  timezone: '+08:00'
});

module.exports = User;