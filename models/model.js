'use strict';
const userMeta = require('./user.js');
const connection = require('../config/db.js');
const encryption = require('../config/passwordEncryption.js');

let User = connection.define('users', userMeta.userOptions);
User.sync()
  .then(() => console.log('Oh yeah! User table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createUser = async ({ username, password }) => {
  try {
    console.log('Create user', username, password)
    let securedPassword = encryption(password);
    await User.create({ username, password: securedPassword });
  } catch (createUserError) {
    return Promise.reject(createUserError);
  }
};

const getAllUsers = async () => {
  await User.findAll();
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