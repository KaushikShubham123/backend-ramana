'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {

  }
  Otp.init({
    email: DataTypes.STRING,
    otp: DataTypes.STRING,
    expiresAT: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};