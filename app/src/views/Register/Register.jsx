import React from 'react';
import { Component } from 'react';

import './Register.scss';

import Form from '../../components/Form/Form';
import UserHandler from '../../handlers/user';
import FormHandler from '../../handlers/form';

import {connect} from 'react-redux';
import {setNavAuth} from '../../actions/navActions';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(data){
        let res = await UserHandler.register(data);
        if(res.success){
            this.props.cookies.set("token",res.data.token,{path:"/"});
            this.props.cookies.set("username",res.data.username,{path:"/"});
            this.props.cookies.set("email",res.data.email,{path:"/"});
            this.props.setNavAuth();
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div id="register-view">
                <Form
                    id="#register-form"
                    inputs={{
                        username: { text: "Username", type: "text", autoComplete: true,/**,value:"New User" */ },
                        email: { text: "Email", type: "email", autoComplete: true, },
                        password: { text: "Password", type: "password" },
                        rpassword: { text: "Repeat Password", type: "password" },
                    }}
                    suggest={{ text: "Already a user? Login!", url: "/login" }}
                    submit={{ text: "Register", action: this.handleSubmit }}
                    validate={{ validate: FormHandler.handleRegister, onError: FormHandler.handleFormInvalid }} // onSuccess:FormHandler.handleFormValid
                />
            </div>
        );
    }
}

export default connect(null,{ setNavAuth })(RegisterView);