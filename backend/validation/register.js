const validator = require('validator');
const isEmail = validator.isEmail;

function validateRegister(body){
    let success = true;
    const errors = []

    if(!body || Object.keys(body) == 0){
        success = false;
        errors.push("Invalid arguments given!");
    }
    else {
        if(typeof body.username !== 'string' || body.username.trim().length < 4){
            success = false;
            errors.push('Username must be at least 4 characters long');
        }
        if(typeof body.email !== 'string' || !isEmail(body.email)){
            success = false;
            errors.push('Please provide a correct email address');
        }
        if(typeof body.password !== 'string' || body.password.trim().length < 8){
            success = false;
            errors.push('Password must be at least 8 characters long');
            errors.push("Passwords don't match!");
        }
        else{
            if(typeof body.rpassword !== 'string' || body.rpassword.trim() !== body.password.trim()){
                success = false;
                errors.push("Passwords don't match!");
            }
        }
    }

    return {
        success,
        errors 
    }
}

module.exports = validateRegister;