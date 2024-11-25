'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttendanceTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AttendanceTable.init({
    employeeId: DataTypes.INTEGER,
    inPhotoUrl: DataTypes.STRING,
    inLongitude: DataTypes.STRING(1000),
    inLatitude: DataTypes.STRING(1000),
    factoryName: DataTypes.STRING,
    inTime: DataTypes.DATE,
    outTime: DataTypes.DATE,
    outLongitude: DataTypes.STRING(1000),
    outLatitude: DataTypes.STRING(1000),
    outPhotoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AttendanceTable',
  });
  return AttendanceTable;
};