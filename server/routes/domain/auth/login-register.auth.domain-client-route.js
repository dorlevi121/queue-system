
const router = require("express").Router();

const authController = require("../../../controller/auth/business/auth.employee-controller");

const { employeeValidator } = require('../../../validator/management/employee.validator');

router.post("/login", authController.employeeLogin);


router.post("/register", employeeValidator, authController.register);
module.exports = router;
