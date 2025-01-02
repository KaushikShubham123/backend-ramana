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
    // static associate(models) {
    // define association here
    // }
  }
  ProductTable.init({
    vendorId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productTitle: DataTypes.STRING(200),
    categories: DataTypes.STRING(200),
    productType: DataTypes.STRING,
    shortDesc: DataTypes.STRING(1000),
    brand: DataTypes.STRING(100),
    unit: DataTypes.DECIMAL(10, 2),
    tags: DataTypes.STRING(100),
    exchangeable: DataTypes.BOOLEAN,
    refundable: DataTypes.BOOLEAN,
    specifications:DataTypes.JSON,
    productDesc: DataTypes.STRING(2000),
    productImages: DataTypes.STRING(10000),
    manufacturerName: DataTypes.STRING(100),
    manufacturerBrand: DataTypes.STRING(100),
    stocks: DataTypes.DECIMAL(10, 2),
    price: DataTypes.DECIMAL(10, 2),
    discount: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
    visibility: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductTable',
  });
  return ProductTable;
};