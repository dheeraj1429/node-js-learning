const express = require("express");
const router = express.Router();
const { Strategy } = require("passport-google-oauth20");
const passport = require("passport");
const authUser = require("../model/Schema/authSignInUserSchme");
const authControllers = require("../controllers/authControllers");

const config = {
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
};

// check the user is valid or not
const checkUser = function (req, res, next) {
    const isUser = req.user;

    if (!isUser) {
        return res.redirect("/");
    }

    next();
};

// passport middlewares
passport.use(
    new Strategy(
        {
            clientID: config.googleClientId,
            clientSecret: config.googleClientSecret,
            passReqToCallback: true,
            callbackURL: "/auth/google/callback",
        },
        async function (req, accessToken, refreshTokne, profile, done) {
            try {
                const googleLoginUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                };

                let user = await authUser.findOne({ googleId: googleLoginUser.googleId });

                if (user) {
                    done(null, user);
                } else {
                    let userRef = await authUser(googleLoginUser);
                    user = await userRef.save();
                    done(null, user);
                }
            } catch (err) {
                console.log(err);
            }
        }
    )
);

// to save the user into the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// to read the data from the session
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/login-fail",
        successRedirect: "/auth/secret-page",
        session: true,
    })
);
router.get("/login-fail", authControllers.loginFailPage);
router.get("/login-success", authControllers.loginSuccess);
router.get("/secret-page", checkUser, authControllers.secretPage);
router.post("/log-out", authControllers.logOut);
router.get("/sign-in-user", authControllers.signInPage);
router.get("/forget-password", authControllers.forgetPassword);
router.post("/user-signin", authControllers.signinUser);

module.exports = router;
