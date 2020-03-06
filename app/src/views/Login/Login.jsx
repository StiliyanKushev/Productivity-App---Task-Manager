import React from 'react';
import { Component } from 'react';

import Form from '../../components/Form/Form';
import UserHandler from '../../handlers/user';
import FormHandler from '../../handlers/form';

import './Login.scss';

import { connect } from 'react-redux';
import {setNavAuth} from '../../actions/navActions';

class LoginView extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(data){
        let res = await UserHandler.login(data);
        
        if(res.success){
            //TODO cookie for token expire date
            this.props.cookies.set("token",res.data.token,{path:"/"});
            this.props.cookies.set("username",res.data.username,{path:"/"});
            this.props.cookies.set("email",res.data.email,{path:"/"});
            this.props.setNavAuth();
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div id="login-view">
                <Form
                    id="#login-form"
                    inputs={{
                        email: { text: "Email", type: "email", autoComplete: true,lowerCase:true/**,value:cookies.username */ },
                        password: { text: "Password", type: "password" },
                    }}
                    suggest={{ text: "Not a user? Join us!", url: "/register" }}
                    submit={{ text: "Login", action: this.handleSubmit }}
                    validate={{ validate: FormHandler.handleLogin, onError: FormHandler.handleFormInvalid }} // onSuccess:FormHandler.handleFormValid
                />
            </div>
        );
    }
}

export default connect(null,{setNavAuth})(LoginView);