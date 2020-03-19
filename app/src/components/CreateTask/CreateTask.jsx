import React from "react";
import { Component } from "react";

import "./CreateTask.scss";
import { connect } from "react-redux";
import {setDay,addTaskToCell} from '../../actions/scheduleActions';
import TaskHandler from '../../handlers/task';
import {toast} from 'react-toastify';

class CreateTask extends Component{
    constructor(props){
        super(props);

        this.state = {
            importancyLevel: 1,
            description:"",
            visible:false,
        }

        this.isCurrent = this.isCurrent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateDate = this.generateDate.bind(this);
        this.closeSelf = this.closeSelf.bind(this);
    }

    generateDate(){
        const zeroPad = (num) => String(num).padStart(2, '0')
        return `${zeroPad(this.props.month)}/${zeroPad(this.props.day)}/${this.props.year}`;
    }

    isCurrent(type){
        if(type === "blue" && this.state.importancyLevel === 1) return 'current';
        if(type === "yellow" && this.state.importancyLevel === 2) return 'current';
        if(type === "red" && this.state.importancyLevel === 3) return 'current';
        return '';
    }

    handleCancel(e){
        e.preventDefault();
        this.closeSelf();
    }

    closeSelf(){
        this.setState({
            importancyLevel: 1,
            description:"",
        },() => {
            this.props.setDay(-1)
        });
    }

    async createTask(importancyLevel,description){
        let date = new Date(this.props.year,this.props.month - 1,this.props.day);
        let token = this.props.cookies.get("token");
        let res = await TaskHandler.createTask(date,importancyLevel,description,token);

        if(res.success){
            toast.success(res.message);
            if(this.props.fullscreen){  // mobile
                //update the global state
                this.props.addTaskToCell(this.props.day - 1,res.task); // index, task
            }
            else{ //desktop
                //update the global state
                this.props.addTaskToCell(this.props.day - 1,res.task); // index, task
            }
            

            this.closeSelf();
        }
        else{
            for(let e in res.errors)
            toast.error(res.errors[e]);
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.createTask(this.state.importancyLevel,this.state.description);
    }

    handleChange(e){
        this.setState({description: e.target.value});
    }

    handleClick(importance){
        this.setState({importancyLevel:importance});
    }

    componentWillReceiveProps(newProps){        
        if(newProps.day !== -1){
            this.setState({visible:true}); 
        }
        else{
            this.setState({visible:false});
        }
    }

    render(){
        return (
            <div id="create-task-menu" className={this.props.fullscreen ? "mobile-full" : ""} style={{display: this.state.visible ? "initial" : "none"}}>
                <div id="content">
                    <p id="date">Date: <span>{this.generateDate()}</span></p>
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
                        <textarea rows="8" cols="20" placeholder="Description" value={this.state.description} onChange={this.handleChange}>
                        </textarea>

                        <button id="submit" onClick={this.handleSubmit}>Create</button>
                        <button id="cancel" onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        year: state.schedule.year,
        month: state.schedule.month,
        day: state.schedule.day,
    }
}

export default connect(mapStateToProps,{setDay,addTaskToCell})(CreateTask);