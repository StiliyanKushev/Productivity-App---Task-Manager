import React from 'react';
import {Route,Redirect, Switch } from "react-router-dom";

//import all views
import HomeView from '../../views/Home/Home';
import LoginView from '../../views/Login/Login';
import RegisterView from '../../views/Register/Register';

const AppContent = function(){
        return(
            <main id="site-content">
                <Switch>
                    <Route path="/" component={HomeView} exact />
                    <Route path="/login" component={LoginView} exact />
                    <Route path="/register" component={RegisterView} exact />

                    <Redirect to="/"/>
                </Switch>
            </main>
        );
}

export default AppContent;