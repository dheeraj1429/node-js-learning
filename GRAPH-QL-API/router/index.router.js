const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/index.controllers");

router.get("/", indexControllers.getHomePage);
router.get("/all-products", indexControllers.getAllProductsPage);

module.exports = router;
