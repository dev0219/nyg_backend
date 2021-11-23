var express = require("express");
var router = express.Router();

const { register } = require("../controllers/authentication");

router.post("/", register);

module.exports = router;