const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queueSchema = new Schema(
  {
    time: {
      type: Date,
      required: true,
    },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    isApprove: {
      type: Boolean,
      default: true,
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Queue", queueSchema);
