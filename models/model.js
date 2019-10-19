'use strict';
const userMeta = require('./user.js');
const connection = require('../config/db.js');

let User = connection.define('users', userMeta.userOptions);
User.sync()
  .then(() => console.log('Oh yeah! User table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createUser = async ({ username, password }) => { 
	console.log("AICI AJUNGE")
  return await User.create({ username, password });
};
const getAllUsers = async () => {
  return await User.findAll();
};
const getUser = async obj => {
  return await User.findOne({
  where: obj,
});
};

module.exports = {
	User,
	createUser,
	getAllUsers,
	getUser,
};