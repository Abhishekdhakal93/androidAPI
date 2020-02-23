var database = require("../databaseConfiguration/dbConfiguration");
var place = require("./place");
var packages = database.sequelize.define(
  "packages",
  {
    //attributes
    packages_id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    packages_name: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    packages_type: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    duration: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    description: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    itinary: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    tableName: "packages"
  }
);


place.hasMany(packages);
packages.belongsTo(place);


packages
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    // console.log(err);
  });

module.exports = packages;
