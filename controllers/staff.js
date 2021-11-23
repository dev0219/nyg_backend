"use strict";
var ObjectId = require("mongodb").ObjectID;
const Staff = require("../models/staff");

const {
	successResponseWithData,
	ErrorResponse,
	badRequest,
} = require("../helpers/apiResponses");

// get all staffs/users list
// Method: GET
exports.getStaff = async (req, res) => {
	try {
		let data = await Staff.find();

		if (data && data.length > 0) {
			successResponseWithData(res, "Staff/User List", data);
		} else {
			successResponseWithData(res, "Staffs/Users not found", data);
		}
	} catch (err) {
		console.error(err.message);
		ErrorResponse(res, err.message);
	}
};

// create Staff/User
// Method: POST
exports.addStaff = async (req, res) => {
	try {
		let body = req.body;
		let staff = new Staff(body);
		let data = await staff.save();

		if (data) {
			successResponseWithData(res, "User created successfully", data);
		} else {
			throw new Error("Error in creating user");
		}
	} catch (err) {
		console.error(err.message);
		ErrorResponse(res, err.message);
	}
};

// get staff/user by id
// Method: GET
exports.getStaffById = async (req, res) => {
	try {
		const { id } = req.params;
		if (ObjectId.isValid(id)) {
			const staff = await Staff.findById(id);
			if (staff) {
				successResponseWithData(res, "Staff found...", staff);
			} else {
				successResponseWithData(res, "Staff not found...", staff);
			}
		} else {
			badRequest(res, "Invalid ObjectID...");
		}
	} catch (error) {
		console.error(error.message);
		ErrorResponse(res, error.message);
	}
};

// Update Staff
// Method: PUT
exports.updateStaff = async (req, res) => {
	try {
		const { id } = req.params;
		if (ObjectId.isValid(id)) {
			const body = req.body;
			const staff = await Staff.findOneAndUpdate({ _id: id }, body, {
				new: true,
			});
			if (staff) {
				successResponseWithData(res, "Staff Updated successfully...", staff);
			} else {
				badRequest(res, "Staff Not Updated...");
			}
		} else {
			badRequest(res, "Invalid ObjectID...");
		}
	} catch (error) {
		console.error(error.message);
		ErrorResponse(res, error.message);
	}
};

// Delete Staff
// Method: DELETE
exports.deleteStaff = async (req, res) => {
	try {
		const { id } = req.params;
		if (ObjectId.isValid(id)) {
			const staff = await Staff.findOneAndDelete({ _id: id });
			successResponseWithData(res, "Staff Deleted...", staff);
		} else {
			badRequest(res, "Invalid ObjectID...");
		}
	} catch (error) {
		console.error(error.message);
		ErrorResponse(res, error.message);
	}
};
