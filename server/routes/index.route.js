module.exports = (app, mongoose) => {

  app.use("/business", async (req, res, next) => {
    try {
      const domain = req.get("domain");
      req.mongo = mongoose.connection.useDb(domain);
      next();
    } catch (error) {
      next(error);
    }
  });
  app.use("/business", require("./business/index.business-route"));


  app.use("/:domain", async (req, res, next) => {
    try {

      const domain = req.params.domain;

      req.mongo = mongoose.connection.useDb(domain);
      next();
    } catch (error) {
      next(error);
    }
  });
  app.use("/:domain", require("./domain/index.domain-route"));

  require("../utils/error/index.error")(app);
};
