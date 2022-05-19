const express = require("express");
const multer = require("multer");
const router = express.Router();

const indexCintrollers = require("../controllers/indexControllers");

const uploadFiles = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "image" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            callback(null, "./uploads/images");
        } else if (
            file.mimetype === "video/3gpp" ||
            file.mimetype === "video/quicktime" ||
            file.mimetype === "video/x-msvideo" ||
            file.mimetype === "video/x-ms-wmv"
        ) {
            callback(null, "./uploads/videos");
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: uploadFiles });

router.get("/", indexCintrollers.getHomePage);
router.get("/upload-products", indexCintrollers.getProductsUploadPage);
router.post("/product/upload-products", upload.single("file"), indexCintrollers.uploadProducts);
router.get("/all-products", indexCintrollers.allProductsPage);
router.get("/single-product/:id", indexCintrollers.singelPage);
router.get("/signIn", indexCintrollers.signInPage);

module.exports = router;
