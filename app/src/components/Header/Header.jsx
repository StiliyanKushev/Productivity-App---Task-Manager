import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header.scss';

class AppHeader extends Component{
    constructor(props){
        super(props);

        this.list = [];
        if(this.props.auth){
            this.list = [
                <li key="home" className="current"><Link to="/" onClick={this.uncheckCheckbox}>Home</Link></li>,
                <li key="schedule" ><Link to="/schedule" onClick={this.uncheckCheckbox}>Schedule</Link></li>,
                <li key="about" ><Link to="/about" onClick={this.uncheckCheckbox}>About me</Link></li>,
                <li key="logout" ><Link to="/logout" onClick={this.uncheckCheckbox}>Logout</Link></li>,
            ];
        }
        else{
            this.list = [
                    <li key="home" className="current" onClick={this.uncheckCheckbox}><Link to="/">Home</Link></li>,
                    <li key="login" ><Link to="/login" onClick={this.uncheckCheckbox}>Login</Link></li>,
                    <li key="register" ><Link to="/register" onClick={this.uncheckCheckbox}>Register</Link></li>,
            ];
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.uncheckCheckbox);
        this.uncheckCheckbox();
    }

    uncheckCheckbox () {
        document.getElementById("nav-checkbox").checked = false;
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.uncheckCheckbox);
    }

    render(){
        return (
            <header id="site-header">
                <input type="checkbox" name="nav-checkbox" id="nav-checkbox"></input>
                <label id="bars" name="bars" htmlFor="nav-checkbox">
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                </label>
                <div id="logo-shadow">
                    <div id="logo">
                        <p>Task Manager</p>
                    </div>
                </div>
                <nav>
                    <ul>
                        {this.list}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default AppHeader;