const product = require("../model/Schema/products.Schema");

const getHomePage = function (req, res, next) {
    return res.render("pages/home");
};

const getProductsUploadPage = function (req, res, next) {
    return res.render("pages/productUpload");
};

const uploadProducts = async function (req, res, next) {
    try {
        const file = req.file;
        const { title, price, description } = req.body;

        const pathArr = file.path.split("\\");
        pathArr.shift();
        const originalPath = pathArr.join("\\");

        if (!file) {
            return res.status(400).json({
                message: "somthing worgn",
            });
        }

        const productRef = await product({
            name: title,
            discription: description,
            image: originalPath,
            price: price,
        });

        const saveData = await productRef.save();

        if (saveData) {
            return res.redirect("/all-products");
        }
    } catch (err) {
        console.log(err);
    }
};

const allProductsPage = async function (req, res, next) {
    try {
        const allProducts = await product.find();

        if (allProducts) {
            return res.render("pages/allProducts", {
                data: allProducts,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const singelPage = async function (req, res, next) {
    try {
        const param = req.params;

        const { id } = param;

        const findProducts = await product.find({ _id: id });

        if (!findProducts)
            return res.status(200).json({
                message: "products is not find",
            });

        console.log(findProducts);

        return res.render("pages/singlePage", {
            data: findProducts,
        });
    } catch (err) {
        console.log(err);
    }
};

const signInPage = function (req, res, next) {
    return res.render("pages/signIn");
};

module.exports = {
    getHomePage,
    getProductsUploadPage,
    uploadProducts,
    allProductsPage,
    singelPage,
    signInPage,
};
