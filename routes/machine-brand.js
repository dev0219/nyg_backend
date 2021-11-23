var express = require("express");
var router = express.Router();

const {
  getAllMachineBrand,
  addMachineBrand,
  getMachineBrandByObjectId,
  updateMachineBrand,
  deleteMachineBrand,
} = require("../controllers/machine-brand");

router.get("/", getAllMachineBrand);

router.post("/", addMachineBrand);

router.get("/:id", getMachineBrandByObjectId);

router.put("/:id", updateMachineBrand);

router.delete("/:id", deleteMachineBrand);

module.exports = router;
