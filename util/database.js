const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'Pandu@000', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;