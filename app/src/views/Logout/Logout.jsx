import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setNavGuest } from '../../actions/navActions';

class LogoutView extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);

        //remove user cookies
        this.props.cookies.remove("token");
        this.props.cookies.remove("username");
        this.props.cookies.remove("email");

        this.props.setNavGuest();
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default connect(null, { setNavGuest })(LogoutView);