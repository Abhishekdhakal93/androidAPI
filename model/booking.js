var database = require("../databaseConfiguration/dbConfiguration");
var user = require("./user");
var packages = require("./packages");
var booking = database.sequelize.define(
  "booking",
  {
    //attributes
    booking_id: {
      type: database.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    date: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
    no_people: {
      type: database.Sequelize.TEXT,
      allowNull: false
    },
  
   
  },
  {
    freezeTableName: true,
    tableName: "booking"
  }
);

user.hasMany(booking);
booking.belongsTo(user);

packages.hasMany(booking);
booking.belongsTo(packages);


booking
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    // console.log(err);
  });

module.exports = booking;
