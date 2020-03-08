import React from "react";
import { Component } from "react";
import Task from '../../components/Task/Task';
import { connect } from "react-redux";
import {setDay,confirmCreated} from '../../actions/scheduleActions';

class TaskCell extends Component{
    constructor(props){
        super(props);

        this.state = {
            index:this.props.index,
            tasks:this.props.tasks,
            tasksHtml:[],
            empty:[],
            moreTasks: [],
        };

        this.handleAddTask = this.handleAddTask.bind(this);
    }

    handleAddTask(){
        this.props.setDay(this.state.index + 1); // index + 1 == day
    }

    generateTasksHtml(){
        let currentTasks = [];
        let moreTasks = [];
        let empty = [];
        for (let j = 0; j < this.state.tasks.length; j++) {
            if (j < 18)
                currentTasks.push(
                    <Task key={j} task={this.state.tasks[j]} />
                );
            else {
                moreTasks.push(
                    <Task key={j} task={this.state.tasks[j]} />
                );
            }
        }
        for (let j = 0; j < 19 - this.state.tasks.length; j++) {
            empty.push(
                <div key={j} className="empty"></div>
            );
        }

        this.setState({
            tasksHtml:currentTasks,
            empty:empty,
            moreTasks: moreTasks
        });
    }

    componentDidMount(){
        if(this.state.tasks !== undefined){
            this.generateTasksHtml();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.created.index === this.state.index && this.state.tasks){
            this.generateTasksHtml();
            this.props.confirmCreated();
        }
    }

    render(){
        let i = this.state.index;
        return(
            <div key={i} className={`item ${this.props.getClassBy(i + 1)}`}>
                    <p className={this.state.tasks !== undefined ? "date" : "date-e"}>{i + 1}</p>
                    {this.state.tasks !== undefined &&
                    <div className="innerGrid">
                        {this.state.tasksHtml}
                        {this.state.empty}
                        {this.state.moreTasks.length > 0 && <div className="more"><p>+{this.state.moreTasks.length}</p></div>}
                        <div className="add-new" onClick={this.handleAddTask}><p>+</p></div>
                    </div>
                    }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        created: state.schedule.created,
    }
}

export default connect(mapStateToProps,{setDay,confirmCreated})(TaskCell);