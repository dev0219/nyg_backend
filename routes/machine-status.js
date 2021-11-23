var express = require("express");
var router = express.Router();

const {
  getAllMachineStatus,
  addMachineStatus,
  getMachineStatusByObjectId,
  updateMachineStatus,
  deleteMachineStatus,
} = require("../controllers/machine-status");

router.get("/", getAllMachineStatus);

router.post("/", addMachineStatus);

router.get("/:id", getMachineStatusByObjectId);

router.put("/:id", updateMachineStatus);

router.delete("/:id", deleteMachineStatus);

module.exports = router;
