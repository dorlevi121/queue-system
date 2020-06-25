const router = require("express").Router();
const authController = require("../../../controller/auth/business/auth.employee-controller");
const authClientController = require("../../../controller/auth/client/auth.client-controller");

router.get("/checkDomain/:domain", authController.check);
router.post("/register", authClientController.clientRegister);
router.post("/login", authClientController.clientLogin);

module.exports = router;


