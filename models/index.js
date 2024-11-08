// import connection of sequelizeconsole
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

db.sequelize
  .sync({ force: false  })
  .then(() => {
    console.log("Connection re-synced");
  })
  .catch((err) => {
    console.log("Error on re-synced", err);
  });

// eslint-disable-next-line @typescript-eslint/no-var-requires
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);
db.buyer = require("../app/modules/buyer/buyer.model")(db.sequelize, DataTypes);
db.product = require("../app/modules/product/product.model")(db.sequelize, DataTypes);
db.purchase = require("../app/modules/purchase/purchase.model")(db.sequelize, DataTypes);
db.sale = require("../app/modules/sale/sale.model")(db.sequelize, DataTypes);
db.supplier = require("../app/modules/supplier/supplier.model")(db.sequelize, DataTypes);
db.accounting = require("../app/modules/accounting/accounting.model")(db.sequelize, DataTypes);


// Each Sale has one corresponding Accounting entry
db.purchase.hasOne(db.accounting, { foreignKey: "purchaseId" });
// Accounting entry belongs to a specific Sale, with saleId as the foreign key in accounting
db.accounting.belongsTo(db.purchase, { foreignKey: "purchaseId" });

// Each Sale has one corresponding Accounting entry
db.sale.hasOne(db.accounting, { foreignKey: "saleId" });
// Accounting entry belongs to a specific Sale, with saleId as the foreign key in accounting
db.accounting.belongsTo(db.sale, { foreignKey: "saleId" });
// Each Sale has one corresponding Accounting entry

db.supplier.hasMany(db.purchase, { foreignKey: "supplierId" });
db.purchase.belongsTo(db.supplier, { foreignKey: "supplierId" });

db.buyer.hasMany(db.sale, { foreignKey: "buyerId" });
db.sale.belongsTo(db.buyer, { foreignKey: "buyerId" });

db.user.hasMany(db.sale, { foreignKey: "userId" });
db.sale.belongsTo(db.user, { foreignKey: "userId" });


db.product.hasMany(db.sale, { foreignKey: "productId" });
db.sale.belongsTo(db.product, { foreignKey: "productId" });

db.product.hasMany(db.purchase, { foreignKey: "productId" });
db.purchase.belongsTo(db.product, { foreignKey: "productId" });






module.exports = db;
