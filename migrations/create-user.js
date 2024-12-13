'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendorId: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      mobile: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.ENUM('Vendor', 'Sub-Vendor', 'Customer', 'Admin'),
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },

      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false

      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  async down(queryInterface, /* Sequelize */) {
    await queryInterface.dropTable('Users');
  }
};