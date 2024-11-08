module.exports = (sequelize, DataTypes, Sequelize) => {
  const Purchase = sequelize.define("Purchase", {
    Id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    paid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    due_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE, // Store only the date
      allowNull: false,
    },
    updated_date: {
      type: DataTypes.DATEONLY, // Store only the date
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for current date
    }
  });

  return Purchase;
};
