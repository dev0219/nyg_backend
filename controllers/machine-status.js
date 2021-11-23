"use strict";
var ObjectId = require("mongodb").ObjectID;
const MachineStatus = require("../models/machine-status");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// create Machine-Status
// Method: POST
exports.addMachineStatus = async (req, res) => {
  try {
    const data = req.body;
    const machineStatus = new MachineStatus(data);
    const response = await machineStatus.save();

    if (response) {
      successResponseWithData(
        res,
        "Machine-Status Created Successfully",
        response
      );
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get all Machine-Status
// Method: GET
exports.getAllMachineStatus = async (req, res) => {
  try {
    const machineStatus = await MachineStatus.find();
    if (machineStatus.length > 0) {
      successResponseWithData(res, "Machine-Status founded", machineStatus);
    } else {
      successResponseWithData(res, "Machine-Status not found", machineStatus);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// GET Specific Machine-Status by Object ID
// Method: GET
exports.getMachineStatusByObjectId = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineStatus = await MachineStatus.findById(_id);
      if (machineStatus) {
        successResponseWithData(res, "Machine-Status founded...", machineStatus);
      } else {
        successResponseWithData(
          res,
          "Machine-Status not founded...",
          machineStatus
        );
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Update Machine-Status
// METHOD: PUT
exports.updateMachineStatus = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const body = req.body;
      const machineStatus = await MachineStatus.findOneAndUpdate({ _id }, body, {
        new: true,
      });
      if (machineStatus) {
        successResponseWithData(
          res,
          "Machine-Status Updated successfully...",
          machineStatus
        );
      } else {
        badRequest(res, "Machine-Status Not Updated...");
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Delete Machine-Status
// METHOD: DELETE
exports.deleteMachineStatus = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineStatus = await MachineStatus.findOneAndDelete({ _id });
      successResponseWithData(res, "Machine-Status Deleted...", machineStatus);
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
