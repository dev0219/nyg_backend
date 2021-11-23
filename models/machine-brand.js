const mongoose = require("../config/db");

// Machine Status Schema
const MachineBrandSchema = new mongoose.Schema(
  {
    mc_brand: {
      type: String,
      required: [true, "MC_BRAND is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MachineBrand = new mongoose.model("MachineBrand", MachineBrandSchema);

module.exports = MachineBrand;
