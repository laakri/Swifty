const express = require("express");
const { async } = require("rxjs");
const Order = require("../models/order");
const router = express.Router();
const User = require("../models/user");
const Prod = require("../models/prod");

module.exports = router;
