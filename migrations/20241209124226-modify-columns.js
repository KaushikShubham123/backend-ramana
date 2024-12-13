'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'userType', {

      type: Sequelize.ENUM('Vendor', 'Sub-Vendor', 'Customer', 'Admin'),// Specify the data type
    }),
      await queryInterface.renameColumn('Users', 'country', 'status');
    await queryInterface.renameColumn('Users', 'companyName', 'vendorId');
    await queryInterface.renameColumn('VendorCompanyDetails', 'vendorId', 'creatorId');


  },

  async down(queryInterface, /* Sequelize */) {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
    await queryInterface.removeColumn('Users', 'country');
  }
};