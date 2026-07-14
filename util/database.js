const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'wb', '123456789_Ir', {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3307,
});

module.exports = sequelize;
