require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const morgen = require("morgan");

const port = process.env.PORT || 5000;

const rootFolder = require("./Helper/RootFolder");

// middleware
app.set("view engine", "hbs");
app.set("views", path.join(rootFolder, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootFolder, "public")));
app.use(express.static(path.join(rootFolder, "build")));
app.use(morgen(":method :url :status :response-time sm"));

// app.use(
//     morgen(function (tokne, req, res) {
//         return [
//             tokne.method(req, res),
//             tokne.url(req, res),
//             tokne.status(req, res),
//             tokne["response-time"](req, res),
//             "ms",
//         ];
//     })
// );

// app.use(function (req, res, next) {
//     console.log("loggin");
//     const url = req.url;
//     console.log(url);
//     next();
// });

// Router files
const indexRouter = require("./routes/indexRoute");

// routes
app.use("/", indexRouter);

// serve to the build file into the web

// app.use("/", (req, res) => {
//     res.sendFile(path.join(rootFolder, "build", "index.html"));
// });

// listen
app.listen(port, () => {
    console.log(`server start on port ${port}`);
});
