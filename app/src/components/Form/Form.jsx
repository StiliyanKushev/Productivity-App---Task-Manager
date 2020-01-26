import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Form.scss';

class Form extends Component{
    constructor(props){
        super(props);

        if(!this.props.submit){
            throw new Error("Submit function not given as a property to a <Form>!");
        }

        if(!this.props.submitText){
            this.props.submitText = "Submit"; // set default value
        }

        if(this.props.validate && !this.props.onInvalid){
            throw new Error("onInvalid not given but valudate object given!");
        }

        this.id = this.props.id;
        this.submit = this.props.submit;
        this.submitText = this.props.submitText;
        this.suggest = this.props.suggest;
        this.inputs = this.props.inputs;
        this.validate = this.props.validate;
        this.onInvalid = this.props.onInvalid;
        this.values = this.props.values;

        let obj = {};

        // init the obj
        if(this.inputs){
            for(let key in this.inputs){
                obj[key] = null;
            }
        }

        // set default values
        if(this.values){
            for(let key in this.values){
                let value = this.values[key];
                
                if(obj[key] !== undefined){ // if obj contains the certain propery [key]
                    obj[key] = value; // update it 
                }
            }
        }

        this.state = obj; // init the state

        //bind functions
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState(this.state);
    }

    handleSubmit(event){
        //dont reload the page
        event.preventDefault();

        //check if valid
        let isValid = true;
        let errors = [];

        for(let key in this.validate){
            let value = this.validate[key];

            if(this.state[key] === undefined){
                throw new Error("You are trying to validate an unspecified input field!");
            }

            //validate
            let result = value(this.state[key],this.state);

            if(result === undefined || result === null){
                throw new Error("One or more of the valiating functions is not returning value");
            }

            if(result !== true){ // THERE IS ERROR
                isValid = false;
                errors.push(result); // result is string with error
            }
        }

        if(isValid === true){ // ALL OK!
            return this.submit(this.state); // return data to the submit function
        }

        else{
            console.log(errors);
            return this.onInvalid(errors);
        }
    }

    handleChange(event){
        let name = event.target.getAttribute('name');
        let value = event.target.value;
        
        let data = {};
        data[name] = value;

        this.setState(data);
    }

    render(){
        // generate the labels and inputs
        const items = [];

        // print the inputs and add values if given in props
        for(let key in this.inputs){
            let type = this.inputs[key];

            let value = key;

            let temp = this.state[key];
            if(temp){ // value was given in props
                value = temp;
            }

            items.push(
                <Fragment key={key}>
                    <label htmlFor={key} style={{display:"none"}}>{key}</label> {/* hide it but have to include it because of semantics */}
                    <input name={key} type={type} placeholder={value} onChange={this.handleChange}/>
                </Fragment>
            );
        }

        return (
            <form id={this.id ? this.id : null} onSubmit={this.handleSubmit}>
                {items}
                <input id="submit" type="submit" value={this.submitText}></input>
                <Link id="suggest-link" to={this.suggestLink || "#"}>{this.suggest}</Link>
            </form>
        );
    }
}

export default Form;