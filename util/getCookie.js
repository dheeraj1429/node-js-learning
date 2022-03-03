const jwt = require('jsonwebtoken');

const KEY = process.env.SCRET_KEY;

const getCookie = async function (req, res, next) {
   try {
      const { userInfo } = req.cookies;

      if (userInfo) {
         const varifyToken = await jwt.verify(userInfo, KEY);

         return varifyToken;
      }
   } catch (err) {
      console.log(err);
   }
};

module.exports = getCookie;
