const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Accounting = sequelize.define("Accounting", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      transaction_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    updated_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    hooks: {
      beforeCreate: (accounting) => {
        // Set created_date on creation
        accounting.created_date = new Date();
      },
      beforeUpdate: (accounting) => {
        // Set updated_date to the current date on update
        accounting.updated_date = new Date();
      },
    },
  });

  return Accounting;
};
