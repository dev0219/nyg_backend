const mongoose = require("../config/db");

// User/Staff Schema
const StaffSchema = new mongoose.Schema(
	{
		staff_department: {
			type: String,
			required: [true, "User Department is required"],
		},
		staff_id: {
			type: String,
			required: [true, "User ID is required"],
		},
		staff_name: {
			type: String,
			required: [true, "User Name is required"],
		},
		staff_location: {
			type: String,
			required: [true, "User Location is required"],
		},
	},
	{
		timestamps: true,
	}
);

const Staff = new mongoose.model("Staff", StaffSchema);

module.exports = Staff;
