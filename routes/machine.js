var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var {
  addMachine,
  getAllMachines,
  getMachineByObjectId,
  deleteMachine,
  updateMachine,
  getMultipleMachines,
} = require("../controllers/machine");

// a simple test url to check that all of our files are communicating correctly.
router.post("/", getAllMachines);
router.post("/machines", getMultipleMachines);

router.post("/", addMachine);

router.get("/:id", getMachineByObjectId);

router.put("/:id", updateMachine);

router.delete("/:id", deleteMachine);

module.exports = router;
