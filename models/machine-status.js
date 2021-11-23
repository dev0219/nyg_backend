const mongoose = require("../config/db");

// Machine Status Schema
const MachineStatusSchema = new mongoose.Schema(
  {
    mc_status: {
      type: String,
      required: [true, "MC_STATUS is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MachineStatus = new mongoose.model("MachineStatus", MachineStatusSchema);

module.exports = MachineStatus;
