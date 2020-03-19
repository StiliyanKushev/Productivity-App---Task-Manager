import React from "react";
import { Component } from "react";

class TaskMobile extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            index:this.props.index,
            id:this.props.task._id,
            importantcyLevel:this.props.task.importantcyLevel,
            description:this.props.task.description,
            date:this.props.task.date,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        //TODO
    }

    render(){
        switch(this.state.importantcyLevel){
            default:{
                return <div className="task blue" onClick={this.handleClick}></div>
            }

            case 1:{
                return <div className="task blue" onClick={this.handleClick}></div>
            }
            case 2:{
                return <div className="task yellow" onClick={this.handleClick}></div>
            }
            case 3:{
                return <div className="task red" onClick={this.handleClick}></div>
            }
        }
    }
}

export default TaskMobile;