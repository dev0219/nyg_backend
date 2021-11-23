var express = require("express");
var router = express.Router();

const {
  getAllMachineTypes,
  addMachineType,
  getMachineTypeByObjectId,
  updateMachineType,
  deleteMachineType,
} = require("../controllers/machine-type");

router.get("/", getAllMachineTypes);

router.post("/", addMachineType);

router.get("/:id", getMachineTypeByObjectId);

router.put("/:id", updateMachineType);

router.delete("/:id", deleteMachineType);

module.exports = router;
