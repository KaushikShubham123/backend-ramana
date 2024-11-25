'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductTable.init({
    salesman_id: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stockAvailability: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductTable',
  });
  return ProductTable;
};