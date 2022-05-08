const express = require("express");
const indexRouter = require("./indexRoute");

const api = express.Router();

// routes
api.use("/", indexRouter);

module.exports = api;
