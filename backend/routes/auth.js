const User = require("../models/User");
const express = require('express');
const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');
const {generateHashedPassword} = require('../utilities/encryption');

const {
    assignToken,
    verifyToken
} = require('../config/token');
const encryption = require('../utilities/encryption');

const router = new express.Router();
router.post('/register', (req, res, next) => {
    const result = validateRegister(req.body);

    if (!result.success) {
        return res.status(200).json({
            success: result.success,
            errors: result.errors
        });
    }

    // add user to database and get user id
    User.findOne({
            $or: [
                {
                    email: req.body.email
                },
                {
                    username: req.body.username
                }
            ]
        })
        .then(user => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    errors: ["A user with this email or username already exists!"]
                });
            }

            let salt = encryption.generateSalt();

            let userObject = {
                email: req.body.email.trim(),
                username: req.body.username.trim(),
                salt: salt,
                password: encryption.generateHashedPassword(salt, req.body.password.trim()),
            };

            let userCreated = User.create(userObject);

            // assign new token using the user id
            userCreated.then(user => {
                let userID = user.id;
                let token = assignToken(userID);

                // return token + user data
                return res.status(200).json({
                    success: true,
                    message: 'You have successfully signed up!',
                    token: token,
                    user: {
                        username: user.username,
                        email: user.email
                    }
                });
            }); 
        });
    }
);

router.post('/login', (req, res, next) => {
    const result = validateLogin(req.body);

    if (!result.success) {
        return res.status(200).json({
            success: result.success,
            errors: result.errors
        });
    }

    User.findOne({
        email: req.body.email,
    }).then(user => {
        if (!user || user.password !== generateHashedPassword(user.salt,req.body.password)) {
            return res.status(200).json({
                success: false,
                errors: ["Invalid Email or Password!"]
            });
        }

        //sign token
        const token = assignToken(user.id);

        return res.status(200).json({
            success: true,
            message: "You have successfuly logged in!",
            token:token,
            user:{
                username: user.username,
                email: user.email
            }
        });
    });
});

module.exports = router;