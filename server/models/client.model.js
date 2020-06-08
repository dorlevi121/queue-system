const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  lastName: {
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
  image: {
    type: String,
    default: "",
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  reliability: {
    type: Number,
    default: 5,
  },
  remark: { type: String, default: "" },
});

// module.exports = mongoose.model("Client", clientSchema);
