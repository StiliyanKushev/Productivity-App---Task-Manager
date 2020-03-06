import React from 'react';
import { Component } from 'react';
import { toast } from 'react-toastify';

import './Schedule.scss';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';
import CreateTask from '../../components/CreateTask/CreateTask';
import TaskHandler from '../../handlers/task';

class ScheduleView extends Component {
    constructor(props){
        super(props);
        
        //main -> looking at the schdule
        //create -> looking at the create menu

        this.state = {
            mode: "main",
            year: 2020,
            month:3,
            day:0, // just some default value (used only in 'create' mode)
            savedCells:undefined, // when clicked create render these cached tasks (no reloading of data)
        };

        this.addTask = this.addTask.bind(this);
        this.goBack = this.goBack.bind(this);
        this.createTask = this.createTask.bind(this);
    }

    addTask(day,cells){
        if(this.state.mode !== "create"){
            // show a center form to create a task
            this.setState({day:day,savedCells:cells,mode:"create"});
        }
    }

    goBack(){
        if(this.state.mode !== "main"){
            this.setState({mode:"main"});
        }
    }

    async createTask(importancyLevel,description){
        let date = new Date(this.state.year,this.state.month - 1,this.state.day);
        let token = this.props.cookies.get("token");
        let res = await TaskHandler.createTask(date,importancyLevel,description,token);

        if(res.success){
            toast.success(res.message);
            this.setState({
                savedCells:undefined,
                mode:"main"
            });
        }
        else{
            for(let e in res.errors)
            toast.error(res.errors[e]);
        }
    }

    render() {
        if(this.state.mode === "create"){
            return(
            <div id="schedule-view">
                <CreateTask createTask={this.createTask} goBack={this.goBack} year={this.state.year} month={this.state.month} day={this.state.day}/>
                <ScheduleGrid preCells={this.state.savedCells} cookies={this.props.cookies} year={this.state.year} month={this.state.month}/>
            </div>);
        }
        if(this.state.mode === "main"){
            return(
            <div id="schedule-view">
                <ScheduleGrid preCells={this.state.savedCells} addTask={this.addTask} cookies={this.props.cookies} year={this.state.year} month={this.state.month}/>
            </div>);
        }
    }
}

export default ScheduleView;