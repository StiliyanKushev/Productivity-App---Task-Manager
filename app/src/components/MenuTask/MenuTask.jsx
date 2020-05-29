import React from 'react';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import './MenuTask.scss';
import { Component } from 'react';

(function () {
    var win = $(window),
        prev_width = win.width(),
        prev_height = win.height();
    win.on('resize', function () {
        var width = win.width(),
            height = win.height();

        if (width !== prev_width) {
            win.trigger('hresize');
        }
        if (height !== prev_height) {
            win.trigger('vresize');
        }

        prev_width = width;
        prev_height = height;
    });
})();

class MenuTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrowPos: undefined,
            pointing: undefined,
            description: this.props.description,
            reset: false,
            visibilityMode: 'display',
            calculatedScrollOnStill: false,
            isMobile: false,
        }

        this.fixedOpenPos = false;
        this.oldScrollPos = 0;
        this.oldPosToFix = 0;

        this.handleChange = this.handleChange.bind(this);
        this.responsive = this.responsive.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.fixFirstOpenPosition = this.fixFirstOpenPosition.bind(this);
    }

    componentDidMount() {
        this.fixFirstOpenPosition();
        if (!this.props.isMobile || (this.props.visible && this.props.isMobile && !this.props.isExpanded))
        this.responsive();

        $(window).on('hresize', this.props.handleClose);

        if (this.props.isMobile) {
            let row = $(findDOMNode(this.refs.self)).parent().parent();
            this.oldScrollPos = row.scrollLeft();
            row.on('scroll', () => {
                this.updateScrollPosition(row);
            });
        }
    }

    fixFirstOpenPosition() {
        console.log('fixFirstOpenPosition')
        if (this.props.isMobile) {
            if (this.fixedOpenPos) {
                return;
            }
            let row = $(findDOMNode(this.refs.self)).parent().parent();
            let currentPos = $(findDOMNode(this.refs.self)).offset();
            $(findDOMNode(this.refs.self)).offset({ left: currentPos.left - row.scrollLeft(), top: currentPos.top });
            this.fixedOpenPos = true;
        }
    }

    updateScrollPosition(row) {
        let newPos = $(row.scrollLeft())[0];
        if (newPos == undefined) newPos = 0;
        let oldPos = this.oldScrollPos;
        let diff = Math.abs(newPos - oldPos);

        let currentPos = $(findDOMNode(this.refs.self)).offset();

        //going right
        if (oldPos < newPos) {
            //substract diff from current pos
            $(findDOMNode(this.refs.self)).offset({ left: currentPos.left - diff, top: currentPos.top });
        }
        //going left
        else {
            //add diff from current pos
            $(findDOMNode(this.refs.self)).offset({ left: currentPos.left + diff, top: currentPos.top });
        }

        this.oldScrollPos = newPos;
    }

    componentWillUnmount() {
        $(window).unbind('hresize');
        let row = $(findDOMNode(this.refs.self)).parent().parent();
        row.unbind('scroll');
    }

    handleChange(e) {
        this.setState({ description: e.target.value });
    }

    responsive() {
        let menuPos = ReactDOM.findDOMNode(this).getBoundingClientRect();

        //if centered but still no room
        if (this.state.pointing === 'centered' && (menuPos.right > document.body.clientWidth || menuPos.left < 0)) {
            this.setState({ pointing: 'centered-forced' }, () => this.responsive() && this.fixFirstOpenPosition());
        }
        else {
            //show left pointing
            if (this.state.pointing !== 'centered-forced' && menuPos.right > document.body.clientWidth) {
                this.setState({ pointing: 'leftPointing' }, () => this.responsive() && this.fixFirstOpenPosition());
            }

            //show top pointing
            if (menuPos.bottom > document.body.clientHeight) {
                this.setState({ pointing: 'topPointing' }, () => this.responsive() && this.fixFirstOpenPosition());
            }

            //show center pointing
            if (this.state.pointing !== 'centered-forced' && menuPos.left < 0 && this.state.pointing === "leftPointing") {
                this.setState({ pointing: "centered" }, () => this.responsive() && this.fixFirstOpenPosition());
            }

            //show right pointing (default) if all of the above are false (cannot use else if coz it breaks stuff i wont explain here)
            if (!(menuPos.right > document.body.clientWidth) && !(menuPos.bottom > document.body.clientHeight) && !(menuPos.left < 0 && this.state.pointing === "leftPointing") && this.state.pointing === undefined) {
                this.setState({ pointing: 'rightPointing' }, () => this.fixFirstOpenPosition());
            }
        }

        return true;
    }


    render() {
    
        let visibilityCss = {};

        if (this.state.visibilityMode === "display") {
            visibilityCss = {
                display: this.props.visible ? "initial" : "none"
            }
        }
        else if (this.state.visibilityMode === "visibility") {
            visibilityCss = {
                visibility: this.props.visible ? "initial" : "hidden"
            }
        }

        let pointing = this.state.pointing;
        if (pointing == 'centered-forced') pointing = 'centered';

        return (
            <div ref='self' id={`menu-${this.props.id}`} className={`menuTask ${pointing}`} style={{ ...visibilityCss }}>
                <div className="menu-arrow" style={{ left: `${this.state.arrowPos || '8'}px` }}></div>
                <textarea cols={30} rows={7} value={this.state.description} onChange={this.handleChange} />
                <div>
                    <button id="edit" onClick={(e) => this.props.handleEdit(e, this.state.description)}>Edit</button>
                    <button id="delete" onClick={this.props.handleDelete}>Delete</button>
                </div>
                <button id="cancel" onClick={this.props.handleClose}>Cancel</button>
            </div>
        );
    }

}

export default MenuTask;