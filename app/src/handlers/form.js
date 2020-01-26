import { toast } from 'react-toastify';

function handleFormInvalid(errors){
    //TODO display some sort of indicator that the data is incorect
    for(let err of errors){
        toast.error(err);
    }
}

function validateEmail(value){
    //TODO verify by regex
    if(!value){
        return "No Email given!";
    }

    return true;
}

function validatePassword(value){
    if(!value){
        return "No password given!";
    }

    if(value.length < 8){
        return "Password should be at least 8 characters long!";
    }

    return true;
}

function validateRepeatPassword(value,other){
    if(!value){
        return "You need to repeat the password!";
    }
    if(value !== other['Password']){
        return "Passwords must match!";
    }

    return true;
}

const FormHandler = {
    handleFormInvalid,
    validateEmail,
    validatePassword,
    validateRepeatPassword
};

export default FormHandler;