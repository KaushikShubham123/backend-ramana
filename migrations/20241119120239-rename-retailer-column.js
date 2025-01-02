'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, /* Sequelize */) {

    //  * Add altering commands here.
    //  *
    //  * Example:
    await queryInterface.renameColumn('User_Profiles', 'salesman_id', 'salesman_id');
    //  */
  },

  async down(queryInterface, /* Sequelize */) {

    //  * Add reverting commands here.
    //  *
    //  * Example:
    await queryInterface.renameColumn('User_Profiles', 'salesman_id', 'retailer_id');

  }
};
