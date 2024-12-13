'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productTitle: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.STRING
      },
      productType: {
        type: Sequelize.STRING
      },
      shortDesc: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.DECIMAL
      },
      tags: {
        type: Sequelize.STRING
      },
      exchangeable: {
        type: Sequelize.BOOLEAN
      },
      refundable: {
        type: Sequelize.BOOLEAN
      },
      productDesc: {
        type: Sequelize.STRING
      },
      productImages: {
        type: Sequelize.STRING
      },
      manufacturerName: {
        type: Sequelize.STRING
      },
      manufacturerBrand: {
        type: Sequelize.STRING
      },
      stocks: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.STRING
      },
      visibility: {
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
    await queryInterface.dropTable('ProductTables');
  }
};