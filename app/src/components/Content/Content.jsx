import React, { Component } from 'react';
import { Redirect, Switch, Route } from "react-router-dom";
import CustomRoute from '../CustomRoute/CustomRoute';

//import all views
import HomeView from '../../views/Home/Home';
import LoginView from '../../views/Login/Login';
import LogoutView from '../../views/Logout/Logout';
import RegisterView from '../../views/Register/Register';
import { connect } from 'react-redux';

import {setNavAuth} from '../../actions/navActions';

class AppContent extends Component{
    constructor(props){
        super(props);

        //user is logged in
        if(this.props.cookies.get("token")){ // TODO check if token expires date
            this.props.setNavAuth();
        }
    }

    render(){
        const token = this.props.cookies.get("token");
        return(
                <main id="site-content">
                    <Switch>
                        <Route exact path="/" render={(props) => <HomeView {...props} cookies={this.props.cookies}/>} />
                        <CustomRoute exact path="/login" verification={!token} render={(props) => <LoginView {...props} cookies={this.props.cookies}/>} />
                        <CustomRoute exact path="/register" verification={!token} render={(props) => <RegisterView {...props} cookies={this.props.cookies}/>} />
                        <CustomRoute exact path="/logout" verification={token} render={(props) => <LogoutView {...props} cookies={this.props.cookies}/>} />
                        <Redirect to="/"/>
                    </Switch>
                </main>
        );
    }
}

//TODO do this logic inside of the custom route ↓                                       
function mapStateToProps(state){
    return {
        nav: state.nav // when log out the content re renders and re calculates the token
    }
}

export default connect(mapStateToProps,{setNavAuth})(AppContent);