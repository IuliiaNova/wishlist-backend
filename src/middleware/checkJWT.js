const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const checkJWT = async (req, res, next) => {
  const token = req.headers["x-token"];

  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token found",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(id);

    if(!user) {
      return res.status(401).json({
        ok: false,
        msg: "This token is not valid",
      });
    }
    next();

  } catch (error) {
    console.log(error);
    return req.status(401).json({
      ok: false,
      msg: "This token is not valid",
    });
  }
};

module.exports = checkJWT;