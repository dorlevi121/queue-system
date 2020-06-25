const router = require("express").Router();

router.use("/authClient", require("./auth/auth.client-route"));




module.exports = router;
