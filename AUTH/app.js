require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const port = 3000;

const rootFolder = path.join(__dirname);

// tamplate engine
app.set("view engine", "ejs");

// static files serve
app.use(express.static(path.join(rootFolder, "public")));

// middlewares
app.use(helmet());
app.use(
    cookieSession({
        name: "cookies-session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes files
const indexRoute = require("./routes/indexRoute");

// routes
app.use("/", indexRoute);

// server
app.listen(port, () => {
    console.log(`server rungin at port ${port}`);
});
