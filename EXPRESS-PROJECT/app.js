require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgen = require("morgan");
const mongoDbConnection = require("./models/db");
const helmet = require("helmet");

const port = process.env.PORT || 5000;

const rootFolder = require("./Helper/RootFolder");
const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoutes");

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientScretKey = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SCRET;

// middleware
app.set("view engine", "hbs");
app.set("views", path.join(rootFolder, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootFolder, "public")));
// app.use(express.static(path.join(rootFolder, "build")));
app.use(morgen(":method :url :status :response-time sm"));

// routes

app.use("/", indexRoute);
app.use("/auth", authRoute);

mongoDbConnection(() => {
    // listen
    app.listen(port, () => {
        console.log(`server start on port ${port}`);
    });
});

module.exports = app;
