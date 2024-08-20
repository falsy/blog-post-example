const Sequelize = require('sequelize');
const model = require('../model');

const sequelize = new Sequelize('sequelize' , 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});
const models = model(Sequelize, sequelize);

module.exports = {
  Sequelize,
  sequelize,
  models
};