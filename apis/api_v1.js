"use strict";
const express = require("express");
const { signIn, welcome } = require("../middleware/auth");
const app = express();

// Importing Routers
const Profile = require("../routes/machine");
const Staff = require("../routes/staff");
const MachineOrder = require("../routes/machine-order");
const Register = require("../routes/auth");
const DashboardRoute = require("../routes/dashboard");

const MachineTypeRoute = require("../routes/machine-type");
const MachineStatusRoute = require("../routes/machine-status");
const MachineBrandRoute = require("../routes/machine-brand");

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "APIs working...",
  });
});

app.post("/login", signIn);

app.use("/machine", welcome, Profile);

app.use("/user", welcome, Staff);

app.use("/machine-order", welcome, MachineOrder);

app.use("/dashboard", welcome, DashboardRoute);

app.use("/register", Register);

app.use("/machineType", welcome, MachineTypeRoute);

app.use("/machineStatus", welcome, MachineStatusRoute);

app.use("/machineBrand", welcome, MachineBrandRoute);

module.exports = app;
