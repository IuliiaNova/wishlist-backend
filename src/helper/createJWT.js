const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (id = "") => {

  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: "6h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject
        } else {
          resolve(token)
        }
      }
    );
  });
};

module.exports = createJWT;
