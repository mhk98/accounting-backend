
const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const PurchaseController = require("./purchase.controller");
const router = require("express").Router();
router.post("/create", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), PurchaseController.insertIntoDB );
router.get("/", PurchaseController.getAllFromDB);
router.get("/:id", PurchaseController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), PurchaseController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), PurchaseController.updateOneFromDB);

const PurchaseRoutes = router;
module.exports =  PurchaseRoutes ;