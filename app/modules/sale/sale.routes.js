
const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const SaleController = require("./sale.controller");
const router = require("express").Router();

router.post("/create", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), SaleController.insertIntoDB );
router.get("/", SaleController.getAllFromDB);
router.get("/:id", SaleController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), SaleController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), SaleController.updateOneFromDB);

const SaleRoutes = router;
module.exports =  SaleRoutes ;
