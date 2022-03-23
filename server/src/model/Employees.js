const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
class Employees extends Model {}

Employees.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'employees',
    timestamps: false,
  }
);

module.exports = Employees;
