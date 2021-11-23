var express = require("express");
var router = express.Router();

const { getMachineOrders } = require("../controllers/dashboard");

router.post("/allMachineOrders", getMachineOrders);

module.exports = router;
