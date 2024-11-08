const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define("Buyer", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY, // Store only the date
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current date
    },
    updated_date: {
      type: DataTypes.DATEONLY, // Store only the date
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current date
    }
  }, {
    hooks: {
      beforeCreate: (buyer) => {
        // Set created_date on creation
        buyer.created_date = new Date();
      },
      beforeUpdate: (buyer) => {
        // Set updated_date to the current date on update
        buyer.updated_date = new Date();
      },
    },
  }
);

  return Buyer;
};
