'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User_Profiles.init({
    salesman_id: DataTypes.INTEGER,
    retailerName: DataTypes.STRING,
    contactNo: DataTypes.STRING,
    outletAddress: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    followUpDate: DataTypes.DATE,
    leadPhase: DataTypes.STRING,
    newImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Profiles',
  });
  return User_Profiles;
};