const mongoose = require("mongoose");

const { errorPassword401: error401, errorDomain401, error404, error422 } = require("../../../utils/error/dbErrorHandler");
const Domain = require("../../../models/domain.model");
const { createToken } = require("../../helper/helper.controller");
const {
  employeeValidator,
} = require("../../../validator/business/employee.validator");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const domainUrl = req.get("domain");
    console.log(domainUrl + "  Dor");

    req.mongo = mongoose.connection.useDb(domainUrl);
    employeeValidator;
    error422(req);
    const employeeBody = { ...req.body };
    const Employee = require("../../../models/employee.model")(req.mongo);

    const domain = new Domain({
      phone: employeeBody.phone,
      domain: req.mongo.name,
    });

    await domain.save();

    const hashedPw = await bcrypt.hash(employeeBody.password, 12);

    const employee = new Employee({
      ...employeeBody,
      password: hashedPw,
    });

    await employee.save();
    const token = createToken(employee);
    res.status(201).json({ message: "create new business", token: token });
  } catch (error) {
    return next(error);
  }
};

exports.employeeLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const domain = await Domain.findOne({ phone: phone });

    error404(domain);

    req.mongo = mongoose.connection.useDb(domain.domain);
    const Employee = require("../../../models/employee.model")(req.mongo);

    const employee = await Employee.findOne({ phone: phone });
    error404(employee);

    const isEqual = await bcrypt.compare(password, employee.password);
    error401(isEqual);

    const token = createToken(employee);

    res.status(200).json({
      message: "employee login success",
      token,
      domain: domain.domain,
    });
  } catch (error) {
    return next(error);
  }
};


exports.check = async (req, res, next) => {
  // const domain =req.get("domain");
  const domain = req.params.domain;
 
    
  try {
    let ans = await require("../../../models/domain.model").find();
    ans = ans.every((e) => e.domain !== domain);


    errorDomain401(ans);
    res.status(200).json({ message: "Domain is free" });
  } catch (error) {
    next(error);
  }
}
