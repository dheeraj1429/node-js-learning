const productsControllers = require("../controllers/product.controllers");

module.exports = {
    Query: {
        getAllProduct: () => {
            return productsControllers.getAllProduct();
        },

        filterProductById: (_, args) => {
            return productsControllers.filterProductById(args.id);
        },
    },

    Mutation: {
        insertNewProduct: (_, args) => {
            return productsControllers.insertNewProduct(args);
        },

        insertNewReview: (_, args) => {
            return productsControllers.insertNewReview(args);
        },
    },
};
