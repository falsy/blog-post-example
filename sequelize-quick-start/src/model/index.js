const boards = require('./boards');

module.exports = (Sequelize, sequelize) => {
	return {
		boards: boards(Sequelize, sequelize)
	};
};