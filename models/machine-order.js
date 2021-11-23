const mongoose = require("../config/db");

// Machine Order Schema
const MachineOrderSchema = new mongoose.Schema(
  {
    order_no: {
      type: String,
      required: [true, "order_no is required"],
    },
    mc_group: {
      type: String,
      required: [true, "mc_group is required"],
    },
    mc_type: [],
    qty: {
      type: String,
      required: [true, "qty is required"],
    },
    mc_location: {
      type: String,
      required: [true, "mc_location is required"],
    },
    request_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "request_by is required"],
      ref: "Staff",
    },
    approve_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "approve_by is required"],
      ref: "Staff",
    },
    job_status: {
      type: String,
      required: [true, "job_status is required"],
    },
    job_type: {
      type: String,
      required: [true, "job_type is required"],
    },
    order_date: {
      type: Date,
      required: [true, "order_date is required"],
    },
    machines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MachineOrder = new mongoose.model("MachineOrder", MachineOrderSchema);

module.exports = MachineOrder;
