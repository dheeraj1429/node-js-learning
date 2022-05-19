const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const indexControllers = require("../controllers/indexControllers");

const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SCRET,
};

passport.use(
    new Strategy(
        {
            clientID: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            passReqToCallback: true,
        },
        function (request, accessToken, refreshTokne, profile, done) {
            console.log(profile);

            return done(null, profile);
        }
    )
);

// to save the user into the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// to read the user from the session
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// if the user is logged in then the user can access the secret page
const checkUserLogin = function (req, res, next) {
    console.log(req.user);

    const isLogedIn = req.user;

    if (!isLogedIn) {
        return res.status(401).json({
            error: "you must log in!",
        });
    }

    next();
};

router.get("/", indexControllers.getHomePage);
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/failure-page",
        successRedirect: "/success-page",
        session: true,
    }),
    indexControllers.googleCallBack
);
router.get("/secret-page", checkUserLogin, indexControllers.secretPageRoute);
router.get("/auth/google/logout", indexControllers.authLogOut);
router.get("/failure-page", indexControllers.failPageRoute);
router.get("/success-page", indexControllers.successPageRoute);
router.get("/auth/logout", indexControllers.authLogOut);

module.exports = router;
