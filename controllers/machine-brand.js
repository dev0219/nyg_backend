"use strict";
var ObjectId = require("mongodb").ObjectID;
const MachineBrand = require("../models/machine-brand");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// create Machine-Brand
// Method: POST
exports.addMachineBrand = async (req, res) => {
  try {
    const data = req.body;
    const machineBrand = new MachineBrand(data);
    const response = await machineBrand.save();

    if (response) {
      successResponseWithData(
        res,
        "Machine-Brand Created Successfully",
        response
      );
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get all Machine-Brand
// Method: GET
exports.getAllMachineBrand = async (req, res) => {
  try {
    const machineBrand = await MachineBrand.find();
    if (machineBrand.length > 0) {
      successResponseWithData(res, "Machine-Brand founded", machineBrand);
    } else {
      successResponseWithData(res, "Machine-Brand not found", machineBrand);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// GET Specific Machine-Brand by Object ID
// Method: GET
exports.getMachineBrandByObjectId = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineBrand = await MachineBrand.findById(_id);
      if (machineBrand) {
        successResponseWithData(res, "Machine-Brand founded...", machineBrand);
      } else {
        successResponseWithData(
          res,
          "Machine-Brand not founded...",
          machineBrand
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

// Update Machine-Brand
// METHOD: PUT
exports.updateMachineBrand = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const body = req.body;
      const machineBrand = await MachineBrand.findOneAndUpdate({ _id }, body, {
        new: true,
      });
      if (machineBrand) {
        successResponseWithData(
          res,
          "Machine-Brand Updated successfully...",
          machineBrand
        );
      } else {
        badRequest(res, "Machine-Brand Not Updated...");
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Delete Machine-Brand
// METHOD: DELETE
exports.deleteMachineBrand = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (ObjectId.isValid(_id)) {
      const machineBrand = await MachineBrand.findOneAndDelete({ _id });
      successResponseWithData(res, "Machine-Brand Deleted...", machineBrand);
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
