const validator = require('validator');
const isEmail = validator.isEmail;

function validateLogin(body){
    let success = true;
    const errors = [];

    if(!body || Object.keys(body) == 0){
        success = false;
        errors.push("Invalid arguments given!");
    }
    else {
        if(typeof body.email !== 'string' || !isEmail(body.email)){
            success = false;
            errors.push('Please provide a correct email address');
        }
        if(typeof body.password !== 'string' || body.password.trim().length < 8){
            success = false;
            errors.push('Password must be at least 8 characters long');
        }
    }

    return {
        success,
        errors 
    }
}

module.exports = validateLogin;