const DB = require('sequelize');

const connect = new DB('seq', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

connect
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });