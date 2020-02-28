const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const REQUIRED_VALIDATION_MSG = '{PATH} is required';

let userSchema = new mongoose.Schema({
    email: {type: String,required: REQUIRED_VALIDATION_MSG,unique:true},
    username: {type: String,required: REQUIRED_VALIDATION_MSG,unique:true},
    password: {type: String, required: REQUIRED_VALIDATION_MSG},
    salt: {type: String, required: REQUIRED_VALIDATION_MSG},
});

userSchema.method({
    authenticate: function (password) {
      return encryption.generateHashedPassword(this.salt, password) === this.password
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;