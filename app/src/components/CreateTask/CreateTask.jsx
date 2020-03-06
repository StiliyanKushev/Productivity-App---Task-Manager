import React from "react";
import { Component } from "react";

import "./CreateTask.scss";

class CreateTask extends Component{
    constructor(props){
        super(props);

        const zeroPad = (num) => String(num).padStart(2, '0')

        this.state = {
            date: `${zeroPad(this.props.month)}/${zeroPad(this.props.day)}/${this.props.year}`,
            importancyLevel: 1,
            description:"",
        }

        this.isCurrent = this.isCurrent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    isCurrent(type){
        if(type === "blue" && this.state.importancyLevel === 1) return 'current';
        if(type === "yellow" && this.state.importancyLevel === 2) return 'current';
        if(type === "red" && this.state.importancyLevel === 3) return 'current';
        return '';
    }

    handleCancel(e){
        e.preventDefault();
        this.props.goBack();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createTask(this.state.importancyLevel,this.state.description);
    }

    handleChange(e){
        this.setState({description: e.target.value});
    }

    handleClick(importance){
        this.setState({importancyLevel:importance});
    }

    render(){
        return (
            <div id="create-task-menu">
                <div id="content">
                    <p id="date">Date: <span>{this.state.date}</span></p>
                    <div id="variants">
                        <div id="option">
                            <p>Regular</p>
                            <div id="blue" onClick={() => this.handleClick(1)} className={this.isCurrent("blue")}></div>
                        </div>
                        <div id="option">
                            <p>Important</p>
                            <div id="yellow" onClick={() => this.handleClick(2)} className={this.isCurrent("yellow")}></div>
                        </div>
                        <div id="option">
                            <p>Crucial</p>
                            <div id="red" onClick={() => this.handleClick(3)} className={this.isCurrent("red")}></div>
                        </div>
                    </div>
                    <form>
                        <textarea rows="8" cols="20" placeholder="Description" onChange={this.handleChange}>
                        </textarea>

                        <button id="submit" onClick={this.handleSubmit}>Create</button>
                        <button id="cancel" onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateTask;