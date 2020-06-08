const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const domainchema = new Schema(
  {
    domain: {
      type: String,
      required: true,
      maxlength: 32,
    },

    phone: {
      type: String,
      unique: true,
      required: true,
      maxlength: 11,
    },
  },
  { timestamps: true }
);

module.exports =mongoose.connection.useDb("manager")
.model("Domain", domainchema);
