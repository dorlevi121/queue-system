const router = require("express").Router();

const isAuth = require("../../../middleware/is-auth")
const Business = require("../../../models/details.model");
const Service = require("../../../models/service.model");
const Schedule = require("../../../models/schedule.modal");



router.get("/", isAuth("employee"), async (req, res, next) => {
  try {
    const business = await Business(req.mongo).findOne();
    const services = await Service(req.mongo).find();
    const schedule = await Schedule(req.mongo).find();
    console.log(schedule);
    
    res.status(201).json({
      msg: "all the business",
      services,
      business,
      employee:req.employee,
      schedule
    }); 
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
