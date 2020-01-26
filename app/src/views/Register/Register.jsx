import React from 'react';

import Form from '../../components/Form/Form';
import UserHandler from '../../handlers/user';

import FormHandler from '../../handlers/form';

import './Register.scss';

const RegisterView = function(){
        return(
            <div id="register-view">
                <Form
                    id="#register-form"
                    submit={UserHandler.register} // calls the function with obj that holds values
                    submitText="Register"
                    suggest="Already a user? Login!"
                    inputs={{'Email':'email','Password':'password','Repeat Password':'password'}} //key is label text and value is type
                    onInvalid={FormHandler.handleFormInvalid}
                    //values={{'Email':'username@example.com'}}
                    validate={{'Email': FormHandler.validateEmail,'Password': FormHandler.validatePassword,'Repeat Password': FormHandler.validateRepeatPassword}}/>
            </div>
        );
}

export default RegisterView;