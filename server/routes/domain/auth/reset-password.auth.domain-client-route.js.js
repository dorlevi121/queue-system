const router = require("express").Router();
const resetPasswordController = require("../../../controller/auth/business/reset-password.employee-controller");
const {
  passwordIsEqualValidator,
} = require("../../../validator/business/employee.validator");
const isAuth = require("../../../middleware/is-auth");

router.get("/mail", resetPasswordController.mail);

router.post("/sendMessage", resetPasswordController.employeeSmsResetPassword);

router.post(
  "/resetPassword/:token",
  passwordIsEqualValidator,
  isAuth("resetPassword"),
  resetPasswordController.employeeResetPassword
);
module.exports = router;
