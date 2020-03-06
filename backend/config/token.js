const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = "VqY6bFMDkjP5s8i7CEhci3FjWpM6JxDF6z9nl8fyKSwhfxLsyO4J4e2vEQlrOBi";

function assignToken(payload){
    return jwt.sign(payload, secret);
}

function verifyToken(req,res,next){
  if (!req.headers.token) {
    return res.status(401).end()
  }

  const token = req.headers.token;

  // decode the token using a secret key-phrase
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).end()
    }

    const userId = decoded;
    User
      .findById(userId)
      .then(user => {
        if (!user) {
          return res.status(401).end()
        }

        req.user = user

        return next()
      })
  })
}

module.exports = {
    assignToken,
    verifyToken
}