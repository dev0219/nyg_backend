const mongoose = require("../config/db");

// Company Schema
const MachineSchema = new mongoose.Schema(
	{
		mc_rfid: {
			type: String,
		},
		mc_sys_id: {
			type: String,
			required: [true, "MC_SYS_ID is must required"],
		},
		ou_code: {
			type: String,
			required: [true, "OU_CODE is must required"],
		},
		mc_dept: {
			type: String,
			required: [true, "MC_DEPT is must required"],
		},
		mc_type: {
			type: String,
			required: [true, "MC_TYPE is must required"],
		},
		mc_group: {
			type: String,
			required: [true, "MC_GROUP is must required"],
		},
		mc_country: {
			type: String,
			required: [true, "MC_COUNTRY is must required"],
		},
		mc_location: {
			type: String,
			required: [true, "MC_LOCATION is must required"],
		},
		mc_brand: {
			type: String,
			required: [true, "MC_BRAND is must required"],
		},
		mc_model: {
			type: String,
			required: [true, "MC_MODEL is must required"],
		},
		mc_serial: {
			type: String,
			required: [true, "MC_SERIAL is must required"],
		},
		mc_install_date: {
			type: Date,
		},
		purchase_date: {
			type: Date,
		},
		purchase_no: {
			type: String,
		},
		invoice_no: {
			type: String,
		},
		mc_total_price: {
			type: Number,
		},
		mc_active: {
			type: Boolean,
		},
		update_by: {
			type: String,
		},
		requested_by: {
			type: String,
		},
		approved_by: {
			type: String,
		},
		responsed_by: {
			type: String,
		},
		maintenance_by: {
			type: String,
		},
		mc_status: {
			type: String,
			enum: ["MA", "Transfer", "Installed", "Moving", "Available"],
		},
		comment: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Machine = new mongoose.model("Machine", MachineSchema);

module.exports = Machine;
