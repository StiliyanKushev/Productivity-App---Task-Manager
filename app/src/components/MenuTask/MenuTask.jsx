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
            pointing: 'rightPointing',
            description: this.props.description,
            reset: false,
            visibilityMode: 'display',
            calculatedScrollOnStill: false,
            isMobile: false,
        }

        this.fixedOpenPos = false;
        this.oldScrollPos = 0;
        this.oldPosToFix = 0;
        this.isOnScrollDesktop = this.props.isExpanded;

        this.handleChange = this.handleChange.bind(this);
        this.responsive = this.responsive.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
        this.fixFirstOpenPosition = this.fixFirstOpenPosition.bind(this);
    }

    componentWillMount(){
        this.isOnScrollDesktop = this.props.isExpanded && !this.props.isMobile;
    }

    componentDidUpdate(){
        this.responsive()
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
        else{
            let cell = $(findDOMNode(this.refs.self)).parent().parent();
            this.oldScrollPos = cell.scrollTop();
            cell.on('scroll', () => {
                this.updateScrollPosition();
            });
        }
    }

    fixFirstOpenPosition() {
        console.log('fixFirstOpenPosition')
        if (this.fixedOpenPos) {
            return;
        }
        if (this.props.isMobile) {
            let row = $(findDOMNode(this.refs.self)).parent().parent();
            let currentPos = $(findDOMNode(this.refs.self)).offset();
            $(findDOMNode(this.refs.self)).offset({ left: currentPos.left - row.scrollLeft(), top: currentPos.top });
            this.fixedOpenPos = true;
        }
        else{
            let cell = $(findDOMNode(this.refs.self)).parent().parent();
            let currentPos = $(findDOMNode(this.refs.self)).offset();
            $(findDOMNode(this.refs.self)).offset({ left: currentPos.left, top: currentPos.top - cell.scrollTop() });
            this.fixedOpenPos = true;
        }
    }

    updateScrollPosition(row) {
        let newPos;
        if(this.props.isMobile)
        newPos = $(row.scrollLeft())[0];
        else
        newPos = $(row.scrollTop())[0];
        if (newPos == undefined) newPos = 0;
        let oldPos = this.oldScrollPos;
        let diff = Math.abs(newPos - oldPos);

        let currentPos = $(findDOMNode(this.refs.self)).offset();

        //going right
        if (oldPos < newPos) {
            if(this.props.isMobile){
                //substract diff from current pos
                $(findDOMNode(this.refs.self)).offset({ left: currentPos.left - diff, top: currentPos.top });
            }
            else{
                $(findDOMNode(this.refs.self)).offset({ left: currentPos.left, top: currentPos.top - diff });
            }
        }
        //going left
        else {
            if(this.props.isMobile){
                //add diff from current pos
                $(findDOMNode(this.refs.self)).offset({ left: currentPos.left + diff, top: currentPos.top });
            }
            else{
                $(findDOMNode(this.refs.self)).offset({ left: currentPos.left, top: currentPos.top + diff });
            }
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

        //show left pointing
        if (menuPos.right > document.body.clientWidth) {
            this.setState({ pointing: 'leftPointing' }, () => this.fixFirstOpenPosition());
        }

        //if centered
        if (this.state.pointing === 'leftPointing' && (menuPos.right > document.body.clientWidth || menuPos.left < 0)) {
            this.setState({ pointing: 'centered' }, () => this.fixFirstOpenPosition());
        }

        //show top pointing
        if (this.state.pointing !== 'topPointing' && menuPos.bottom >= window.innerHeight) {
            this.setState({ pointing: 'topPointing' }, () => {

                //force browser to redraw the date switcher to fix a strange chrome bug
                let sel = document.getElementById('date-switcher');
                sel.style.display='none';
                // eslint-disable-next-line
                sel.offsetHeight; // no need to store this anywhere, the reference is enough
                sel.style.display='';
                
                this.fixFirstOpenPosition()
            });
        }
    }


    render() {
        return (
            <div ref='self' id={`menu-${this.props.id}`} className={`menuTask ${this.state.pointing} ${this.isOnScrollDesktop? 'onScroll-desktop':''}`}>
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