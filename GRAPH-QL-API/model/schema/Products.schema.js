const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "plase enter the product name"] },
    price: { type: String, required: [true, "plase enter the product price"] },
    discription: { type: String, required: [true, "plase enter the discription of the product"] },
    imageName: { type: String, required: [true, "plase enter the product image name"] },
    createdAt: { type: String, default: Date.now },
    reviews: [{ review: { type: String } }],
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
