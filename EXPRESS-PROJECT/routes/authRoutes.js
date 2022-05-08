const express = require("express");
const router = express.Router();

const checkUserLogIn = function (req, res, next) {
    const isLogedIn = true;

    if (!isLogedIn) {
        res.status(401).json({
            error: "you must log in",
        });
    }

    next();
};

const authControllers = require("../Controllers/authControllers");

router.post("/signIn", authControllers.signInUser);
router.get("/getAllUsers", authControllers.getAllUsers);
router.post("/delete", authControllers.deleteUserFunction);
router.get("/sceret", checkUserLogIn, authControllers.screct);
router.get("/google-login", authControllers.goolgeLogin);
router.get("/google/callback", authControllers.googleCallBack);
router.get("/logout", authControllers.googleLogOut);

module.exports = router;
