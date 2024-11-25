module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'mobile', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      // defaultValue: 'Unknown', // Optional: set default value to handle nulls
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'mobile', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,  // Remove the unique constraint
    });
  }
};
