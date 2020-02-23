var database = require("../databaseConfiguration/dbConfiguration");

var place = database.sequelize.define(
  "place",
  {
    //attributes
    place_id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    place_name: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
   
    image: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
   
      country: {
        type: database.Sequelize.TEXT,
        allowNull: false
      },
      city: {
        type: database.Sequelize.TEXT,
        allowNull: false
      },
      address: {
        type: database.Sequelize.TEXT,
        allowNull: false
      },
  },
  {
    freezeTableName: true,
    tableName: "place"
  }
);







place
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    // console.log(err);
  });

module.exports = place;
