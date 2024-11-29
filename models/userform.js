'use strict';
const {
  Model,
  ENUM
} = require('sequelize');
const { validCategories } = require('../constant');

module.exports = (sequelize, DataTypes) => {
  class Userform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Userform.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
    itemCategory: ENUM(...validCategories),
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Userform',
    timestamps: true
  });
  return Userform;
};



