import React from "react";
import { Component } from "react";
import TaskMobile from '../../components/TaskMobile/TaskMobile';
import { connect } from "react-redux";
import { setDay, confirmCreated, removeTaskFromCell, editTaskFromCell, confirmDeleted, confirmEdited } from '../../actions/scheduleActions';

class TaskRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskLimit: 2, //TODO calculate this on resize!
            index: this.props.index,
            tasks: this.props.tasks,
            tasksHtml: [],
            moreTasks: [],
        };
        this.getDayString = this.getDayString.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    generateTasksHtml() {
        let currentTasks = [];
        let moreTasks = [];
        for (let j = 0; j < this.state.tasks.length; j++) {
            if (j < this.state.taskLimit)
                currentTasks.push(
                    <TaskMobile cookies={this.props.cookies} index={j} key={j} task={this.state.tasks[j]} />
                );
            else {
                moreTasks.push(
                    <TaskMobile cookies={this.props.cookies} index={j} key={j} task={this.state.tasks[j]} />
                );
            }
        }

        //reset the tasks and then reinitialize them
        this.setState({
            tasksHtml: [],
            moreTasks: [],
        }, () => {
            this.setState({
                tasksHtml: currentTasks,
                moreTasks: moreTasks
            });
        })
    }

    isCurrent(){
        let current = new Date();
        if(this.props.year === current.getFullYear() && this.props.month - 1 === current.getMonth() && this.state.index + 1 === current.getDate())
        return true;

        return false;
    }

    getDayString(){
        let date = new Date(this.props.year,this.props.month,this.state.index + 1);
        let weekday = ["Su","Mo","Tu","We","Th","Fr","Sa"];

        return weekday[date.getDay()];
    }

    componentDidMount() {
        if (this.state.tasks !== undefined) {
            this.generateTasksHtml();
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.created.index === this.state.index && this.state.tasks) {
            this.generateTasksHtml();
            this.props.confirmCreated();
        }
        else if (nextProps.deleted.cellIndex === this.state.index && this.state.tasks) {
            this.generateTasksHtml();
            this.props.confirmDeleted();
        }
        else if (nextProps.edited.cellIndex === this.state.index && this.state.tasks) {
            this.generateTasksHtml();
            this.props.confirmEdited();
        }
    }

    handleAddTask(){
        this.props.setDay(this.state.index + 1); // index + 1 == day
    }

    render() {
        let i = this.state.index;
        return (
            <div className={`row ${this.props.isLast === true ? " edge-b" : ''} ${this.isCurrent() ? 'current': ''}`}>
                <div className="row-date">
                    <p className="date">{this.getDayString()} <span>{i + 1}</span></p>
                </div>
                <div className="row-tasks">
                    {this.state.tasksHtml}
                </div>
                <div className="row-add">
                    <div className="container-add" onClick={this.handleAddTask}><p>+</p></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        year: state.schedule.year,
        month: state.schedule.month,
        created: state.schedule.created,
        deleted: state.schedule.deleted,
        edited: state.schedule.edited,
    }
}

export default connect(mapStateToProps, { setDay, confirmCreated, editTaskFromCell, removeTaskFromCell, confirmDeleted, confirmEdited })(TaskRow);