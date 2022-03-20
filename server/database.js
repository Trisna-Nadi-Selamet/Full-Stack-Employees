const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('env-employees', 'postgres', 'admin', {
  dialect: 'postgres',
  host: '127.0.0.1',
});

module.exports = sequelize;
