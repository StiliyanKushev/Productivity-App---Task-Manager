import { toast } from 'react-toastify';
import validator from 'validator';
const isEmail = validator.isEmail;

function handleFormInvalid(errors){
    for(let err in errors){
        toast.error(errors[err]);
    }
}

function handleLogin(body){
    const errors = [];

    if(!body || Object.keys(body) === 0){
        errors.push("Invalid arguments given!");
    }
    else {
        if(typeof body.email !== 'string' || !isEmail(body.email)){
            errors.push('Please provide a correct email address');
        }
        if(typeof body.password !== 'string' || body.password.trim().length < 8){
            errors.push('Password must be at least 8 characters long');
        }
    }

    return errors;
}

function handleRegister(body){
    const errors = [];

    if(!body || Object.keys(body) === 0){
        errors.push("Invalid arguments given!");
    }
    else {
        if(typeof body.username !== 'string' || body.username.trim().length < 4){
            errors.push('Username must be at least 4 characters long');
        }
        if(typeof body.email !== 'string' || !isEmail(body.email)){
            errors.push('Please provide a correct email address');
        }
        if(typeof body.password !== 'string' || body.password.trim().length < 8){
            errors.push('Password must be at least 8 characters long');
            errors.push("Passwords don't match!");
        }
        else{
            if(typeof body.rpassword !== 'string' || body.rpassword.trim() !== body.password.trim()){
                errors.push("Passwords don't match!");
            }
        }
    }

    return errors;
}


const FormHandler = {
    handleFormInvalid,
    handleRegister,
    handleLogin
};

export default FormHandler;