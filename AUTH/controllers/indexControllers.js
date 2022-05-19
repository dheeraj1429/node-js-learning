const getHomePage = (req, res, next) => {
    return res.render("pages/homePage", {
        title: "Node Authentication",
    });
};

// google route
const googleRoute = function (req, res, next) {
    console.log("loading..");
};

// google callback route
const googleCallBack = function (req, res, next) {
    console.log("google called us back!!");
};

// logout
const authLogOut = function (req, res, next) {
    req.logOut();

    console.log("user log out");

    return res.redirect("/");
};

// secret page
const secretPageRoute = function (req, res, next) {
    return res.render("pages/secret", {
        title: "secret page",
    });
};

// fail page
const failPageRoute = function (req, res, next) {
    return res.render("pages/fail", {
        title: "fail page",
    });
};

// success page
const successPageRoute = function (req, res, next) {
    return res.render("pages/success");
};

module.exports = {
    getHomePage,
    googleRoute,
    googleCallBack,
    secretPageRoute,
    authLogOut,
    authLogOut,
    failPageRoute,
    successPageRoute,
};
