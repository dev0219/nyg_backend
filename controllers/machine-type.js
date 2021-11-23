"use strict";
var ObjectId = require("mongodb").ObjectID;
const MachineType = require("../models/machine-type");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// create Machine-Type
// Method: POST
exports.addMachineType = async (req, res) => {
  try {
    const data = req.body;
    const machineType = new MachineType(data);
    const response = await machineType.save();

    if (response) {
      successResponseWithData(
        res,
        "Machine-Type Created Successfully",
        response
      );
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get all Machine-Types
// Method: GET
exports.getAllMachineTypes = async (req, res) => {
  try {
    const MachineTypes = await MachineType.find();
    if (MachineTypes.length > 0) {
      successResponseWithData(res, "Machine-Types founded", MachineTypes);
    } else {
      successResponseWithData(res, "Machine-Types not found", MachineTypes);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// GET Specific Machine-Type by Object ID
// Method: GET
exports.getMachineTypeByObjectId = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineType = await MachineType.findById(_id);
      if (machineType) {
        successResponseWithData(res, "Machine-Type founded...", machineType);
      } else {
        successResponseWithData(
          res,
          "Machine-Type not founded...",
          machineType
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

// Update Machine-Type
// METHOD: PUT
exports.updateMachineType = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const body = req.body;
      const machineType = await MachineType.findOneAndUpdate({ _id }, body, {
        new: true,
      });
      if (machineType) {
        successResponseWithData(
          res,
          "Machine-Type Updated successfully...",
          machineType
        );
      } else {
        badRequest(res, "Machine-Type Not Updated...");
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Delete Machine-Type
// METHOD: DELETE
exports.deleteMachineType = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineType = await MachineType.findOneAndDelete({ _id });
      successResponseWithData(res, "Machine-Type Deleted...", machineType);
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
