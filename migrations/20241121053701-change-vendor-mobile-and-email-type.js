'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Vendors", "mobile", {
      type: DataTypes.STRING,
      unique: true
    }),
      await queryInterface.addColumn("Vendors", "email", {
        type: DataTypes.STRING,
        unique: true
      }
      )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeColumn("Vendors", "mobile", {
    //   type: DataTypes.STRING
    // }),
    //   await queryInterface.removeColumn("Vendors", "email", {
    //     type: DataTypes.STRING
    //   })

  }
};
