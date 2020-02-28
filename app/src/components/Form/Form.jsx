import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Form.scss';

import {setCurrent} from '../../actions/navActions';
import { connect } from 'react-redux';

class Form extends Component{
    constructor(props){
        super(props);

        if(!this.props.submit){
            throw new Error("Submit object not given as property of <Form>!");
        }
        if(this.props.suggest && !this.props.suggest.url){
            throw new Error("Suggest url not given as propery of <Form suggest={}>");
        }
        if(this.props.suggest && !this.props.suggest.text){
            throw new Error("Suggest text not given as propery of <Form suggest={}>");
        }

        this.id = this.props.id;
        this.inputs = this.props.inputs;
        this.submit = this.props.submit;
        this.suggest = this.props.suggest;
        this.validate = this.props.validate;

        //set default values
        for(let k in this.inputs){
            if(!this.inputs[k].value){
                this.inputs[k].value = "";
            }
        }

        //bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.normalizedState = this.normalizedState.bind(this);
        this.handleSuggestClick = this.handleSuggestClick.bind(this);

        this.state = this.inputs;
    }

    componentDidMount(){
        this.setState(this.state);
    }
    
    normalizedState() {
        let data = {};
        for(let key in this.state){
            data[key] = this.state[key].value;
        }

        return data;
    }

    handleSuggestClick(event){
        let def = event.currentTarget.href;
        let rx = /\/([a-z]|[A-Z])+$/gm;
        let route = rx.exec(def)[0];
        this.props.setCurrent(route);
    }
    
    handleSubmit(event){
        //dont reload the page
        event.preventDefault();

        //check if valid
        let errors = this.validate.validate(this.normalizedState());

        if(errors.length === 0){ // ALL OK!
            return this.submit.action(this.normalizedState()); // return data to the submit function
        }

        else{
            return this.validate.onError(errors);
        }
    }

    handleChange(event){
        let name = event.target.getAttribute('name');
        let value = event.target.value;
        
        let temp = this.state;
        temp[name].value = value;

        this.setState(temp);
    }

    render(){
        // generate the labels and inputs
        const items = [];

        for(let inputKey in this.state){
            let inputData = this.state[inputKey];

            items.push(
                <Fragment key={inputKey + "-fragment"}>
                    <label htmlFor={inputKey} style={{display:"none"}}>{inputData.text}</label> {/* hide it but have to include it because of semantics */}
                    <input autoComplete={inputData.autoComplete ? "on" : "off"} value={inputData.value || ""} name={inputKey} type={inputData.type || "text"} placeholder={inputData.text} onChange={this.handleChange}/>
                </Fragment>
            );
        }


        return (
            <form id={this.id ? this.id : ""} onSubmit={this.handleSubmit}>
                {items}
                <input autoComplete="off" id="submit" type="submit" value={this.submit.text || "Submit"}></input>
                <Link id="suggest-link" to={this.suggest.url || "#"} onClick={this.handleSuggestClick} >{this.suggest.text}</Link>
            </form>
        );
    }
}

export default connect(null,{setCurrent})(Form);