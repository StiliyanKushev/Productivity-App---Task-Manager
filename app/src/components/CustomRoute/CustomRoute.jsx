import React from "react";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = function({component:Component,render,verification,redirectPath,...rest}){
    if(verification)
        return <Route {...rest} render={render}/>;
    else
        return <Redirect to={redirectPath || "/login"}/>
}

export default CustomRoute;