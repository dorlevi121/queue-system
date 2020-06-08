const router = require("express").Router();
const resetPasswordController = require("../../../controller/auth/business/reset-password.employee-controller");

const authController = require("../../../controller/auth/business/auth.employee-controller");
const isAuth = require("../../../middleware/is-auth");


const { employeeValidator,passwordIsEqualValidator } = require('../../../validator/business/employee.validator');

router.post("/login", authController.employeeLogin);

router.get("/check/:domain", authController.check);

router.post("/register", employeeValidator, authController.register);

//reset password
router.get("/mail", resetPasswordController.mail);

router.post("/sendResetMessage", resetPasswordController.employeeSmsResetPassword);

router.post(
  "/resetPassword/:token",
  passwordIsEqualValidator,
  isAuth("resetPassword"),
  resetPasswordController.employeeResetPassword
);

module.exports = router;


