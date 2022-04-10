const express = require("express");
const router = express.Router();

const indexControllers = require("../Controllers/IndexControllers");

router.get("/", indexControllers.homePage);
router.get("/home/api", indexControllers.getId);
router.post("/home/add", indexControllers.addItem);
router.get("/products/api", indexControllers.api);
router.get("/image", indexControllers.sendimage);
router.get("/cart", indexControllers.cartPage);

module.exports = router;
