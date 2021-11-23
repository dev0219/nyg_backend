"use strict";
var ObjectId = require("mongodb").ObjectID;
const MachineOrder = require("../models/machine-order");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// Get Machine Orders
// Method: POST
exports.getMachineOrders = async (req, res) => {
  try {
    const { mc_location, mc_group } = req.body;

    let find = {};
    mc_location ? (find.mc_location = mc_location) : true;
    mc_group ? (find.mc_group = mc_group) : true;

    let data = await MachineOrder.find(find);

    if (data && data.length > 0) {
      successResponseWithData(res, "Machine Orders", {
        data,
        totalCount: data.length,
      });
    } else {
      successResponseWithData(res, "No Machine Orders Found", {
        data,
        totalCount: data.length,
      });
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
