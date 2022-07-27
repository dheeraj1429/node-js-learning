const productModel = require("../model/schema/Products.schema");

const getAllProduct = async function () {
    const getAllProducts = await productModel.find({});
    return getAllProducts;
};

const insertNewProduct = async function (args) {
    try {
        const findProductIsExist = await productModel.findOne({
            name: args.name,
            price: args.price,
            imageName: args.imageName,
        });

        if (findProductIsExist && !!findProductIsExist) {
            console.log("product already exist");
            return JSON.stringify({ success: true, message: "product already exist" });
        } else {
            const insertProduct = await productModel({
                name: args.name,
                price: args.price,
                discription: args.discription,
                imageName: args.imageName,
            });

            const dataSave = await insertProduct.save();

            return dataSave;
        }
    } catch (err) {
        console.log(err);
    }
};

const filterProductById = async function (args) {
    try {
        const findProduct = await productModel.findOne({ _id: args });
        return findProduct;
    } catch (err) {
        console.log(err);
    }
};

const insertNewReview = async function (args) {
    try {
        const { productId, review } = args;

        const insertReview = await productModel.updateOne(
            { _id: productId },
            { $push: { reviews: { review: review } } }
        );

        if (!!insertReview.modifiedCount) {
            return insertReview;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllProduct,
    insertNewProduct,
    filterProductById,
    insertNewReview,
};
