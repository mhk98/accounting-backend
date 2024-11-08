const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const BuyerController = require("./buyer.controller");
const router = require("express").Router();

router.post("/create", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), BuyerController.insertIntoDB );
router.get("/", BuyerController.getAllFromDB);
router.get("/:id", BuyerController.getDataById);
router.delete("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), BuyerController.deleteIdFromDB);
router.patch("/:id", auth( ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), BuyerController.updateOneFromDB);


const BuyerRoutes = router;
module.exports =  BuyerRoutes ;