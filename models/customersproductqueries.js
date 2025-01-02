'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomersProductQueries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomersProductQueries.init({
    productId: DataTypes.STRING,
    name: DataTypes.STRING,

    email: DataTypes.STRING,
    mobile: DataTypes.STRING,

    city: DataTypes.STRING,
    country: DataTypes.STRING,

    purchaseType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomersProductQueries',
  });
  return CustomersProductQueries;
};