var database = require("../databaseConfiguration/dbConfiguration");

var user = database.sequelize.define(
  "user",
  {
    //attributes
    user_id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    last_name: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    contact: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    address: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: database.Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    tableName: "user"
  }
);

user
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    // console.log(err);
  });

module.exports = user;
