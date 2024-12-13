'use strict';
const {
  Model,
  ENUM

} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

  }
  User.init({
    vendorId: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: ENUM('Vendor', 'Sub-Vendor', 'Customer', 'Admin'),
    verified: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};