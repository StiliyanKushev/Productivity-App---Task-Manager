import React from 'react';

import Form from '../../components/Form/Form';
import UserHandler from '../../handlers/user';
import FormHandler from '../../handlers/form';

import './Login.scss';

const LoginView = function(){
        return(
            <div id="login-view">
                <Form
                    id="#login-form"
                    submit={UserHandler.login} // calls the function with obj that holds values
                    submitText="Login"
                    suggest="Not a user? Join us!"
                    inputs={{'Email':'email','Password':'password'}} //key is label text and value is type
                    onInvalid={FormHandler.handleFormInvalid}
                    //values={{'Email':'username@example.com'}}
                    validate={{'Email': FormHandler.validateEmail,'Password': FormHandler.validatePassword}}/>
            </div>
        );
}

export default LoginView;