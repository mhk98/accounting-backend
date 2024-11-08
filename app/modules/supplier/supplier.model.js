const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const Supplier = sequelize.define("Supplier", {
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
      beforeCreate: (supplier) => {
        // Set created_date on creation
        supplier.created_date = new Date();
      },
      beforeUpdate: (supplier) => {
        // Set updated_date to the current date on update
        supplier.updated_date = new Date();
      },
    },
  }
    
   
  );

  return Supplier;
};
