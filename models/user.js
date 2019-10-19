'use strict';

const Sequelize = require('sequelize');
const connection = require('../config/db.js');
const encryption = require('../config/passwordEncryption.js');

const userOptions = {
  username: {
    type:      Sequelize.STRING,
    unique:    true,
    allowNull: false,
    validate:  {
      len: {
        args: [6, 25],
        msg:  'Minimum 6, maximum 25 charachters'
      }
    }
  },
  password: {
    unique:    true,
    allowNull: false,
    type:      Sequelize.STRING,
    validate:  {
      len: {
        args: [6,1024],
      }
    }
  },
  type: {
    type:          Sequelize.ENUM('BIBLIOTECAR', 'CITITOR'),
    unique:        false,
    allowNull:     false,
    defaultValue: 'CITITOR'
  },
};

let User = connection.define('utilizatori', userOptions);
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
  try {
    const {
      count,
      rows
    } = await User.findAndCountAll();
    return {
      count,
      rows
    }
  } catch (error) {
    return Promise.reject(error);
  }
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
