'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salesman_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      retailerName: {
        type: Sequelize.STRING
      },
      contactNo: {
        type: Sequelize.STRING
      },
      outletAddress: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      followUpDate: {
        type: Sequelize.DATE
      },
      leadPhase: {
        type: Sequelize.STRING
      },
      newImage: {
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
  async down(queryInterface, /* Sequelize */) {
    await queryInterface.dropTable('User_Profiles');
  }
};