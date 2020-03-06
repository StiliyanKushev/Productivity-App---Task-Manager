import React from "react";
import { Component } from "react";

class Task extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            keyI:this.props.keyI,
            tasks:this.props.tasks,
            empty:this.props.empty,
            moreTasks:this.props.moreTasks,
        };
    }

    render(){
        let i = this.state.keyI;
        return(
            <div key={i} className={`item ${this.props.getClassBy(i + 1)}`}>
                    <p className="date">{i + 1}</p>
                    <div className="innerGrid">
                        {this.state.tasks}
                        {this.state.empty}
                        {this.state.moreTasks && this.state.moreTasks.length > 0 && <div className="more"><p>+{this.state.moreTasks.length}</p></div>}
                        <div className="add-new" onClick={() => this.props.addTask(i + 1)}><p>+</p></div>
                    </div>
            </div>
        );
    }
}

export default Task;