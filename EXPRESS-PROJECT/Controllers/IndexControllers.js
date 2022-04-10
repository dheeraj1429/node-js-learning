const fs = require("fs");
const rootFolder = require("../Helper/RootFolder");
const path = require("path");

const arr = [
    { name: "dheeraj", age: 21 },
    { name: "aman", age: 21 },
    { name: "karan", age: 20 },
];

const homePage = function (req, res, next) {
    res.render("home", {
        data: "this is the dynmic data",
        title: "home page",
    });
};

const getId = function (req, res, next) {
    res.status(200).json(arr);
};

const addItem = function (req, res, next) {
    const data = req.body;

    if (data) {
        arr.push(data);

        res.status(200).json(arr);
    }
};

const api = function (req, res, next) {
    fs.readFile(path.join(rootFolder, "Products.util.json"), "utf-8", function (err, data) {
        if (err) {
            console.log(err);
        }

        res.status(200).json({
            data,
        });
    });
};

const sendimage = function (req, res, next) {
    res.sendFile(path.join(rootFolder, "public", "images", "photo.jpg"));
};

const cartPage = function (req, res, next) {
    res.render("cart", {
        title: "cart page",
    });
};

module.exports = {
    homePage,
    getId,
    addItem,
    api,
    sendimage,
    cartPage,
};
