var express = require("express");
var router = express.Router();

var {
	getStaff,
	addStaff,
	getStaffById,
	updateStaff,
	deleteStaff,
} = require("../controllers/staff");

router.get("/", getStaff);

router.post("/", addStaff);

router.get("/:id", getStaffById);

router.put("/:id", updateStaff);

router.delete("/:id", deleteStaff);

module.exports = router;
