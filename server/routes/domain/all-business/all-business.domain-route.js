const router = require("express").Router();

const isAuth = require("../../../middleware/is-auth")
const Business = require("../../../models/details.model");
const Service = require("../../../models/service.model");


router.get("/", isAuth("client"), async (req, res, next) => {
  try {
    const business = await Business(req.mongo).findOne();
    const services = await Service(req.mongo).find();

    res.status(201).json({
      msg: "all the business",
      services,
      business,

    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
