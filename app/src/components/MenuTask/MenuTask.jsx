import React from 'react';
import ReactDOM from 'react-dom';

import './MenuTask.scss';
import { Component } from 'react';

class MenuTask extends Component {
    constructor(props){
        super(props);

        this.state = {
            styles: {},
            pointing: undefined,
            topPointingStyle:{},
            description:this.props.description,
            reset:false,
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({description:e.target.value});
    }

    componentDidUpdate(){
        let menuPos = ReactDOM.findDOMNode(this).getBoundingClientRect();
        if(window.innerWidth < menuPos.right && !this.state.updated){
            this.setState({pointing: "leftPointing",updated:true});
        }
        else if(window.innerHeight < menuPos.bottom && !this.state.updated){
            this.setState({pointing: "topPointing",updated:true});
        }

        // reset the description on close
        if(!this.props.visible && !this.state.reset){
            this.setState({description:this.props.description,reset:true});
        }
    }

    render() {
        return (
            <div id="menuTask" className={this.state.pointing || ''} style={{display: this.props.visible ? "initial" : "none",...this.state.topPointingStyle}}>
                <textarea cols={30} rows={7} value={this.state.description} onChange={this.handleChange}/>
                <div>
                    <button id="edit" onClick={this.props.handleEdit}>Edit</button>
                    <button id="delete" onClick={this.props.handleDelete}>Delete</button>
                </div>
                <button id="cancel" onClick={this.props.handleClose}>Cancel</button>
            </div>
        );
    }
    
}

export default MenuTask;