const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    start: {
      type: String,
      required: true,
    },

    end: {
      type: String,
      required: true,
    },

    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    clientPhone: { type: Schema.Types.Phone , ref: "Client", required: true },

    isApprove: {
      type: Boolean,
      default: true,
    },
    
    isPaid: {
      type: Boolean,
      default: true,
    },

    title: {
      type: String,
      required: false
    }, 

    description: {
      type: String,
      required: false
    }, 
  },
  { timestamps: true }
);

 module.exports = mongoose.model("Event", eventSchema);
