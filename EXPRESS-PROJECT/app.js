require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const port = process.env.PORT || 5000;

const rootFolder = require("./Helper/RootFolder");

// middleware
app.set("view engine", "hbs");
app.set("views", path.join(rootFolder, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootFolder, "public")));

// Router files
const indexRouter = require("./routes/indexRoute");

// routes
app.use("/", indexRouter);

// listen
app.listen(port, () => {
    console.log(`server start on port ${port}`);
});
