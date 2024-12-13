'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VendorCompanyDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VendorCompanyDetails.init({
    creatorId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    companyRegisteredNumber: DataTypes.STRING,
    companyMobileNumber: DataTypes.STRING,
    companyEmailAddress: DataTypes.STRING,
    companyRegisteredDate: DataTypes.STRING,
    companyAddress: DataTypes.STRING(1000),
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    video: DataTypes.STRING(10000)
  }, {
    sequelize,
    modelName: 'VendorCompanyDetails',
  });
  return VendorCompanyDetails;
};