const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Review: sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    reviewDate: DataTypes.DATE,
    description: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
  }),
};
