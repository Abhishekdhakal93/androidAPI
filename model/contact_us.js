var database = require("../databaseConfiguration/dbConfiguration");
var user = require("./user");
var contact = database.sequelize.define(
  "contact",
  {
    //attributes
    contact_id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    subject: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    message: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    tableName: "contact"
  }
);


contact
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    // console.log(err);
  });

module.exports = contact;
