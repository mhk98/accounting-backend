const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensure name is not empty
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue:0,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    hooks: {
      beforeCreate: (product) => {
        // Set created_date on creation
        product.created_date = new Date();
      },
      beforeUpdate: (product) => {
        // Set updated_date to the current date on update
        product.updated_date = new Date();
      },
    },
  });

  return Product;
};
