'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employees = require('./Employees');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
  }
);
Employees.belongsTo(User);
module.exports = User;
