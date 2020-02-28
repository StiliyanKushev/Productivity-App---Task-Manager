const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = "VqY6bFMDkjP5s8i7CEhci3FjWpM6JxDF6z9nl8fyKSwhfxLsyO4J4e2vEQlrOBi";

function assignToken(payload){
    return jwt.sign(payload, secret);
}

function verifyToken(token){
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return false;
        }
    
        const userId = decoded.sub
        User
          .findById(userId)
          .then(user => {
            if (!user) {
              return false;
            }
            return user;
          })
      })
}

module.exports = {
    assignToken,
    verifyToken
}