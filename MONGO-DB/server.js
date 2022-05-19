require("dotenv").config();

const express = require("express");
const path = require("path");
const PORT = process.env.PORT;

const app = express();

const rootFolder = path.join(path.dirname(process.mainModule.filename));

// middlewares
app.set("view engine", "ejs");
app.use(express.static(path.join(rootFolder, "views")));
app.use(express.static(path.join(rootFolder, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

// server listing
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
