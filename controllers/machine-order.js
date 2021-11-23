"use strict";
var ObjectId = require("mongodb").ObjectID;
const MachineOrder = require("../models/machine-order");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// create Machine Order
// Method: POST
exports.addMachineOrder = async (req, res) => {
  try {
    const data = req.body;
    data.machines = data.machines.map((machine) => ObjectId(machine));
    data.order_no = await MachineOrder.findOne({}, "-_id order_no", {
      limit: 1,
      sort: { createdAt: -1 },
    }).then((order) => (order ? parseInt(order.order_no) + 1 : 1));

    data.request_by = ObjectId(data.request_by || "0");
    data.approve_by = ObjectId(data.approve_by || "0");
    data.order_date = new Date(data.order_date);
    const order = new MachineOrder(data);
    const response = await order.save();

    if (response) {
      successResponseWithData(
        res,
        "Machine Order Created successfully",
        response
        // order
      );
    } else {
      throw new Error("Error in creating machine order");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get all Machines
// Method: GET
exports.getAllMachineOrders = async (req, res) => {
  try {
    const orders = await MachineOrder.find()
      .populate("request_by")
      .populate("approve_by");

    successResponseWithData(
      res,
      orders && orders.length > 0
        ? "Machine Orders List"
        : "Machine Orders Not Available",
      orders
    );
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// GET Specific Machine Order by Object ID
// Method: GET
exports.getMachineOrderByObjectId = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const order = await MachineOrder.findById(id)
        .populate("request_by")
        .populate("approve_by")
        .populate({
          path: "machines",
          select: { mc_serial: 1, mc_type: 1, mc_brand: 1, mc_model: 1 },
        });

      successResponseWithData(
        res,
        order ? "Machine Order Details" : "Machine Order Not Found",
        order
      );
    } else {
      badRequest(res, "Invalid ObjectID");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Update Machine Order
// METHOD: PUT
exports.updateMachineOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const body = req.body;
      body.request_by ? (body.request_by = ObjectId(body.request_by)) : true;
      body.approve_by ? (body.approve_by = ObjectId(body.approve_by)) : true;
      body.order_date
        ? (body.order_date = new Date(body.order_date))
        : delete body.order_date;

      const order = await MachineOrder.findOneAndUpdate({ _id: id }, body, {
        new: true,
        runValidators: true,
      })
        .populate("request_by")
        .populate("approve_by");
      if (order) {
        successResponseWithData(
          res,
          "Machine Order Updated successfully...",
          order
        );
      } else {
        badRequest(res, "Machine Order Not Updated");
      }
    } else {
      badRequest(res, "Invalid ObjectID");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Delete Machine Order
// METHOD: DELETE
exports.deleteMachineOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const order = await MachineOrder.findOneAndDelete({ _id: id });
      successResponseWithData(res, "Machine Order Deleted", order);
    } else {
      badRequest(res, "Invalid ObjectID");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
