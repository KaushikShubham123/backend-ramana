'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user = require('./user')(sequelize, Sequelize.DataTypes, Sequelize.Model);

db.otp = require('./otp')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.userProfile = require('./user_profiles')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.vendor = require('./vendor')(sequelize, Sequelize.DataTypes, Sequelize.Model);
// db.productCategory = require('./productcategory')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.productTable = require('./producttable')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.attendanceTable = require('./attendancetable')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.userform = require('./userform')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.updateprofile = require('./updateprofile')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db.vendorcompanydetails = require('./vendorcompanydetails')(sequelize, Sequelize.DataTypes, Sequelize.Model);
// db.user.hasOne(db.userProfile);
// db.userProfile.belongsTo(db.user, {
//   foreignKey: { name: "salesman_id" }
// });

// db.productTable.belongsTo(db.productCategory, {
//   foreignKey: { name: "categoryId" }
// });
// db.vendor.belongsTo(db.userProfile, {
//   foreignKey: { name: "userProfileId" }
// });

db.sequelize.sync({ force: false });
module.exports = db;
