'use strict';

const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const connection = new Sequelize({
  database: 'biblioteca_db',
  username: 'root',
  password: 'Bibliotec@1',
  dialect: 'mysql',
});
// check the databse connection
connection
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = connection;
