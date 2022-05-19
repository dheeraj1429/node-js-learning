require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmat = require("helmet");
const cookieSession = require("cookie-session");
const databaseConnectionFuntion = require("./model/db/db.connection");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 8000;

// commen-modules
const rootFolder = require("./util/rootFolder");
const indexRoute = require("./route/indexRouter");
const authRouter = require("./route/authRouter");

// middleware
app.use(helmat());
app.use(morgan());
app.set("view engine", "ejs");
app.use(express.static(path.join(rootFolder, "public")));
app.use(express.static(path.join(rootFolder, "uploads")));
app.use(
    cookieSession({
        name: "cooki-session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.KEY_1, process.env.KEY_2],
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", indexRoute);
app.use("/auth", authRouter);

// database connection
databaseConnectionFuntion(() => {
    // server listen
    app.listen(port, () => {
        console.log(`server start at port ${port}`);
    });
});
