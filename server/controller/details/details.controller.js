const moment = require("moment");
const initialHours = require('../../utils/system/hours');

const { error422, error404, error403Admin, error401guest } = require("../../utils/error/dbErrorHandler");

exports.postBuisnessDetails = async (req, res, next) => {
  try {
    error422(req);

    error403Admin(req);

    const updatdeDetail = { ...req.body };
    const Business = require("../../models/details.model")(req.mongo);

    const detailsExist = await Business.findOneAndUpdate(updatdeDetail);
    if (!detailsExist) {
      updatdeDetail.hours = initialHours;
      await new Business(updatdeDetail).save();
    }

    res.status(201).json({
      msg: "update buisness details",
      updatdeDetail: updatdeDetail,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getBuisnessDetails = async (req, res, next) => {
  try {
    const Business = require("../../models/details.model")(req.mongo);
    const details = await Business.findOne();
    error404(details);
    error401guest(req.guest, req.mongo)


    res.status(200).json({
      msg: "buisness details",
      buisnessDetails: details,
    });
  } catch (err) {
    return next(err);
  }
};


exports.postBuisnessHours = async (req, res, next) => {
  try {
    // error422(req);

    error403Admin(req);
    const hours = { ...req.body };

    const Business = require("../../models/details.model")(req.mongo);
    
    const buisness = await Business.findOne();    
    buisness.hours = hours;

    await buisness.save();

    res.status(200).json({
      msg: "update buisness hours",
      hours: buisness.hours,
    });
  } catch (err) {
    return next(err);
  }
};

exports.postDefualtHours = async (req, res, next) => {
  var d = new Date();
  d.setHours(d.getHours() + 5);
  var a = new Date();
  a = moment(a).format("HH:mm");
  d = moment(d).format("HH:mm");
  const arr = [
    { day: "friday", startTime: a, endTime: d },
    { day: "mon", startTime: a, endTime: d },
    { day: "tue", startTime: a, endTime: d },
  ];
  console.log(a);

  try {
    const Business = require("../../models/details.model")(req.mongo);

    const buisness = await Business.findOne();

    buisness.schedule = arr;

    await buisness.save();

    res.status(200).json({
      msg: "update buisness hours",
      buisness,
    });
  } catch (err) {
    return next(err);
  }
};

