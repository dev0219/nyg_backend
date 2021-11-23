var express = require("express");
var router = express.Router();

var {
	getAllMachineOrders,
	addMachineOrder,
	getMachineOrderByObjectId,
	updateMachineOrder,
	deleteMachineOrder,
} = require("../controllers/machine-order");

router.get("/", getAllMachineOrders);

router.post("/", addMachineOrder);

router.get("/:id", getMachineOrderByObjectId);

router.put("/:id", updateMachineOrder);

router.delete("/:id", deleteMachineOrder);

module.exports = router;
