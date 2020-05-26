import React from "react";
import ReactDOM from 'react-dom';
import { Component } from "react";
import Task from '../../components/Task/Task';
import { connect } from "react-redux";
import { 
    setDay, 
    confirmCreated, 
    removeTaskFromCell, 
    editTaskFromCell, 
    confirmDeleted, 
    confirmEdited } from '../../actions/scheduleActions';

class TaskRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mergeMoreTasks:true,
            taskLimit: this.calcTaskLimit(),
            index: this.props.index,
            tasks: this.props.tasks,
            tasksHtml: [],
            moreTasks: [],
        };
        this.updateTaskLimitAndRender = this.updateTaskLimitAndRender.bind(this);
        this.getDayString = this.getDayString.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.calcTaskLimit = this.calcTaskLimit.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleShrink = this.handleShrink.bind(this);
    }

    calcTaskLimit(){
        //get the width of the container
        //math.floor() or ceil() ? 
        //(container-width - (paddings + spacing)) / 30px (width of the 'bubble task')
        
        if(document.getElementsByClassName("row-tasks") && document.getElementsByClassName("row-tasks")[0]){
            let container_width = document.getElementsByClassName("row-tasks")[0].getBoundingClientRect().width;
            let paddings = (6 * 2);
            let res = Math.floor((container_width - paddings) / (25 + 14));
            return res;
        }
    }

    editTask(newData,index){
        this.props.editTaskFromCell(newData,this.state.index,index);
    }

    removeTask(index){
        this.props.removeTaskFromCell(this.state.index,index);
    }

    generateTasksHtml() {
        let currentTasks = [];
        let moreTasks = [];
        let limit = this.state.taskLimit;
        if(this.state.mergeMoreTasks === true){ // make room for (+N)
            limit--;
        }

        for (let j = 0; j < this.state.tasks.length; j++) {
            if (this.state.mergeMoreTasks === false || j < limit)
                currentTasks.push(
                    <Task rowIndex={this.state.index} isMobile={true} isOnScroll={this.state.mergeMoreTasks === false} editTaskFromRedux={this.editTask} removeTaskFromRedux={this.removeTask} cookies={this.props.cookies} index={j} key={j} task={this.state.tasks[j]} />
                );
            else {
                moreTasks.push(
                    <Task rowIndex={this.state.index} isMobile={true} editTaskFromRedux={this.editTask} removeTaskFromRedux={this.removeTask} cookies={this.props.cookies} index={j} key={j} task={this.state.tasks[j]} />
                );
            }
        }

        if(this.state.mergeMoreTasks === false){
            //add the shrink button
            currentTasks.push(
                <div onClick={this.handleShrink} key="shrink-btn" className="task shrink-btn"><span>-</span></div>
            );
            currentTasks.push(
                <div key="shrink-btn-margin-right" className="task empty"></div>
            );
        }

        //reset the tasks and then reinitialize them
        this.setState({tasksHtml: [],moreTasks: []}, () => {
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
        let date = new Date(this.props.year,this.props.month - 1,this.state.index + 1);
        let weekday = ["Su","Mo","Tu","We","Th","Fr","Sa"];

        return weekday[date.getDay()];
    }

    updateTaskLimitAndRender(forceRender){
        if(this.state.mergeMoreTasks === true){
            let prevLimit = this.state.taskLimit;
            this.setState({taskLimit:this.calcTaskLimit()},() => {
                
                if(this.props.tasks.length > this.state.taskLimit){
                    this.setState({mergeMoreTasks:true},() => {
                        if(forceRender === true || prevLimit !== this.state.taskLimit){
                            this.generateTasksHtml();
                        }
                    });
                }
                else{
                    if(forceRender === true || prevLimit !== this.state.taskLimit){
                        this.generateTasksHtml();
                    }
                }
            });
        }
    }

    componentDidMount() {
        window.addEventListener("resize",this.updateTaskLimitAndRender);
        if (this.state.tasks !== undefined) {
            this.updateTaskLimitAndRender(true);
        }
    }

    componentWillUnmount(){
        window.removeEventListener("resize",this.updateTaskLimitAndRender);
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

    handleShrink(){
        ReactDOM.findDOMNode(this).childNodes[1].scrollLeft = 0;
        this.setState({mergeMoreTasks:true},() => {
            this.generateTasksHtml();
        });
    }

    handleExpand(){
        this.setState({mergeMoreTasks:false},() => {
            this.generateTasksHtml();
        });
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
                <div className={`row-tasks ${this.state.mergeMoreTasks === false ? 'expanded' : ''}`}>
                    {this.state.tasksHtml}
                    {this.state.moreTasks.length > 0 ? <p onClick={this.handleExpand}>+{this.state.moreTasks.length}</p>: ''}
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

export default connect(mapStateToProps, {setDay, confirmCreated, editTaskFromCell, removeTaskFromCell, confirmDeleted, confirmEdited })(TaskRow);