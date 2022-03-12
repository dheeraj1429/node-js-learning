const jwt = require('jsonwebtoken');

const KEY = process.env.SCRET_KEY;

const getSessionData = async function (req, res, next) {
    try {
        const userInfo = req.session.userInfo;

        if (userInfo) {
            const varifyToken = await jwt.verify(userInfo, KEY);

            return varifyToken;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = getSessionData;
