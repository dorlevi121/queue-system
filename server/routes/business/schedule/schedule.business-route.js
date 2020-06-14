const router = require("express").Router();
const scheduleController = require("../../../controller/schedule/schedule.controller");
const isAuth = require("../../../middleware/is-auth");

router.get("/", isAuth("employee"), scheduleController.getAllSchedule);

router.post("/scheduleWeek", isAuth("employee"), scheduleController.getScheduleWeek);

router.post(
  "/scheduleWeek",
  isAuth("employee"),
  scheduleController.postScheduleWeek
);

router.put(
  "/scheduleWeek",
  isAuth("employee"),
  scheduleController.putScheduleWeek
);

// router.delete("/", isAuth("employee"), scheduleController.deleteService);
module.exports = router;
