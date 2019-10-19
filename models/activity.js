'use strict';

const Sequelize = require('sequelize');
const connection = require('../config/db.js');
const encryption = require('../config/passwordEncryption.js');

const activityOptions = {
  tip: {
    type:      Sequelize.ENUM('STIINTIFICE', 'CULTURALE'),
    unique:    false,
    allowNull: false
  },
  format: {
    unique:    false,
    allowNull: false,
    type:      Sequelize.ENUM('CONFERINTA', 'SIMPOZION', 'LECTIE_PUBLICA', 'MASA_ROTUNDA', 'COLOCVIU')
  },
  dataDesfasurare: {
    allowNull:    true,
    type:         Sequelize.DATE
  },
  locatie: {
      allowNull: false,
      type:      Sequelize.STRING,
      defaultValue: 'TBA'
  },
  nrTotalLocuri: {
      allowNull: false,
      type:      Sequelize.INTEGER,
  },
    nrLocuriDisponibile: {
        allowNull: false,
        type:     Sequelize.INTEGER,
        validate:  () => {
            if (this.nrLocuriDisponibile < 1) {
                throw new Error('Nu locuri epuizat!');
            }
        }
    }
  }

};

let Activity = connection.define('activitate', userOptions);
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

module.exports.userOptions = userOptions;