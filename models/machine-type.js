const mongoose = require("../config/db");

// Machine Type Schema
const MachineTypeSchema = new mongoose.Schema(
  {
    mc_type: {
      type: String,
      required: [true, "MC_TYPE is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MachineType = new mongoose.model("MachineType", MachineTypeSchema);

module.exports = MachineType;
