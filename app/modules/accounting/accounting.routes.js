const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const  AccountingController = require("./accounting.controller");
const router = require("express").Router();

router.get("/", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AccountingController.getAllFromDB);
router.get("/:id", AccountingController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AccountingController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AccountingController.updateOneFromDB);

const AccountingRoutes = router;
module.exports =  AccountingRoutes ;
