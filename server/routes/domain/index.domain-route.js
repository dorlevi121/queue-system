const router = require("express").Router();

router.use("/service", require("./service/service.domain-client-route"));
router.use("/details", require("./details/details.domain-client-route"));
router.use("/", require("./all-business/all-business.domain-route"));

module.exports = router;
