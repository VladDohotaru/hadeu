'use strict';

const Sequelize = require('sequelize');
const connection = require('../config/db.js');

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
		allowNull: 		false,
		type:      		Sequelize.STRING,
		defaultValue: 'TBA'
  },
  nrTotalLocuri: {
		allowNull: false,
		type:      Sequelize.INTEGER,
  },
  nrLocuriDisponibile: {
    allowNull: false,
    type:			 Sequelize.INTEGER,
    validate:  () => {
			if (this.nrLocuriDisponibile < 1) {
					throw new Error('Nu locuri epuizat!');
			}
    }
	},
	descriere: {
		allowNull: false,
		type:			 Sequelize.STRING,
	},
	audienta: {
		allowNul: false,
		type:			Sequelize.ENUM('COPII', 'TINERI', 'ADOLESCENTI', 'ADULTI', 'SENIORI'),
	},
	topic: {
		allowNull: false,
		type:			 Sequelize.ENUM('TEATRU', 'MUZICA', 'DANS'),
	},
	limba: {
		allowNull: false,
		type:			 Sequelize.ENUM('ROMANA', 'RUSA', 'ENGLEZA')
	}
};

let Activity = connection.define('activitate', activityOptions);
Activity.sync()
  .then(() => console.log('Oh yeah! Tabela Activitate created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createActivity = async (response) => {
  try {
		console.log('ACTIVITATE:', response);
    return await Activity.create(response);
  } catch (createActivityError) {
    return Promise.reject(createActivityError);
  }
};

const getAllActivities = async () => {
  try {
    const {
      count,
      rows
    } = await Activity.findAndCountAll();
    return {
      count,
      rows
    }
  } catch (error) {
    return Promise.reject(error);
  }
};


const getActivity = async obj => {
  return await Activity.findOne({
    where: obj,
  });
};

module.exports = {
	Activity,
	createActivity,
	getAllActivities,
	getActivity,
};