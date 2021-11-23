const mongoose = require("../config/db");

// Machine Location - Group Schema
const MachineLocationGroupSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, "Value is required"],
    },
    hasParent: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MachineLocationGroup",
    },
  },
  {
    timestamps: true,
  }
);

const MachineLocationGroup = new mongoose.model(
  "MachineLocationGroup",
  MachineLocationGroupSchema
);

module.exports = MachineLocationGroup;
