import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { connect } from 'react-redux';
import {setCurrent} from '../../actions/navActions';

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(e) {
        this.uncheckCheckbox();

        this.props.setCurrent(e.currentTarget.text);

        //re render the component to display the new "current" tag
        this.forceUpdate();
    }

    uncheckCheckbox() {
        document.getElementById("nav-checkbox").checked = false;
    };

    componentDidMount() {
        this.setState(this.state);
        window.addEventListener('resize', this.uncheckCheckbox);
        this.uncheckCheckbox();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.uncheckCheckbox);
    }

    render() {
        let list = [];

        for(let name in this.props.nav.list){
            let route = this.props.nav.list[name];
            let item =
            <li key={name} className={name === this.props.nav.current ? 'current' : ''}>
            <Link to={route} onClick={this.handleLinkClick}>{name}</Link></li>;
            
            list.push(item);
        }

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
                        {list}
                    </ul>
                </nav>
            </header>
        );
    }
}

const stateToProps = state => {
    return {
        user: state.user,
        nav: state.nav,
    }
}

export default connect(stateToProps,{setCurrent})(AppHeader);