"use strict";
var ObjectId = require("mongodb").ObjectID;
const Machine = require("../models/machine");

const {
  successResponseWithData,
  ErrorResponse,
  badRequest,
} = require("../helpers/apiResponses");

// create Machine
// Method: POST
exports.addMachine = async (req, res) => {
  try {
    const data = req.body;
    const machine = new Machine(data);
    const response = await machine.save();

    if (response) {
      successResponseWithData(res, "Machine Created successfully", response);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get all Machines
// Method: GET
exports.getAllMachines = async (req, res) => {
  try {
    let { mc_location, mc_status } = req.body;
    let query = {};
    mc_status ? (query.mc_status = mc_status) : true;
    mc_location ? (query.mc_location = mc_location) : true;
    const Machines = await Machine.find(query);
    if (Machines.length > 0) {
      successResponseWithData(res, "Machines founded", Machines);
    } else {
      successResponseWithData(res, "Machines not founded", Machines);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// GET Specific Machine by Object ID
// Method: GET
exports.getMachineByObjectId = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const machine = await Machine.findById(id);
      if (machine) {
        successResponseWithData(res, "Machine founded...", machine);
      } else {
        successResponseWithData(res, "Machine not founded...", machine);
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Update Machine
// METHOD: PUT
exports.updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const body = req.body;
      const machine = await Machine.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      if (machine) {
        successResponseWithData(
          res,
          "Machine Updated successfully...",
          machine
        );
      } else {
        badRequest(res, "Machine Not Updated...");
      }
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Delete Machine
// METHOD: DELETE
exports.deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    if (ObjectId.isValid(id)) {
      const machine = await Machine.findOneAndDelete({ _id: id });
      successResponseWithData(res, "Machine Deleted...", machine);
    } else {
      badRequest(res, "Invalid ObjectID...");
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};

// Get Multiple Machines By Machine-IDs
// METHOD: POST
exports.getMultipleMachines = async (req, res) => {
  try {
    let { machines } = req.body;
    machines = machines.map((machine) => ObjectId(machine));
    let data = await Machine.find({ _id: { $in: machines } });
    if (data) {
      successResponseWithData(res, "Machine List", data);
    } else {
      successResponseWithData(res, "No Machine Selected", data);
    }
  } catch (error) {
    console.error(error.message);
    ErrorResponse(res, error.message);
  }
};
