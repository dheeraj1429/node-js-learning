const getHomePage = function (req, res) {
    res.render("pages/home.ejs", {
        pageTitle: "Home Page",
    });
};

const getAllProductsPage = async function (req, res) {
    res.render("pages/allProducts.ejs", {
        pageTitle: "all products",
    });
};

module.exports = {
    getHomePage,
    getAllProductsPage,
};
