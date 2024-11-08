const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const BuyerRoutes = require('../modules/buyer/buyer.routes');
const PurchaseRoutes = require('../modules/purchase/purchase.routes');
const SaleRoutes = require('../modules/sale/sale.routes');
const SupplierRoutes = require('../modules/supplier/supplier.routes');
const ProductRoutes = require('../modules/product/product.routes');
const AccountingRoutes = require('../modules/accounting/accounting.routes');

const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
  {
    path: "/buyer",
    route: BuyerRoutes
  },
  {
    path: "/product",
    route: ProductRoutes
  },
 
  {
    path: "/purchase",
    route: PurchaseRoutes
  },
 
  {
    path: "/sale",
    route: SaleRoutes
  },
 
  {
    path: "/supplier",
    route: SupplierRoutes
  },
  {
    path: "/accounting",
    route: AccountingRoutes
  },
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
