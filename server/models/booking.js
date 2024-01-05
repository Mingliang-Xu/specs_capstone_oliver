const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Booking: sequelize.define("booking", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    bookingTime: DataTypes.TIME,
    bookingDate: DataTypes.DATE,
    numberOfPeople: DataTypes.INTEGER,
    email: DataTypes.STRING,
  }),
};
