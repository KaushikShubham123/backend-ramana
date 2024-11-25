'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttendanceTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeId: {
        type: Sequelize.INTEGER
      },
      inPhotoUrl: {
        type: Sequelize.STRING
      },
      inLongitude: {
        type: Sequelize.STRING
      },
      inLatitude: {
        type: Sequelize.STRING
      },
      factoryName: {
        type: Sequelize.STRING
      },
      inTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      outTime: {
        type: Sequelize.DATE
      },
      outLongitude: {
        type: Sequelize.STRING
      },
      outLatitude: {
        type: Sequelize.STRING
      },
      outPhotoUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttendanceTables');
  }
};