import React from "react";
import { Component } from "react";
import Task from '../../components/Task/Task';
import { connect } from "react-redux";
import {setDay,confirmCreated,removeTaskFromCell,editTaskFromCell,confirmDeleted,confirmEdited} from '../../actions/scheduleActions';

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
        this.removeTaskFromCell = this.removeTaskFromCell.bind(this);
        this.editTaskFromCell = this.editTaskFromCell.bind(this);

    }
    
    removeTaskFromCell(index){
        this.props.removeTaskFromCell(this.state.index,index);
    }

    editTaskFromCell(newData,index){
        this.props.editTaskFromCell(newData,this.state.index,index);
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
                    <Task cookies={this.props.cookies} editTaskFromCell={this.editTaskFromCell} removeTaskFromCell={this.removeTaskFromCell} index={j} key={j} task={this.state.tasks[j]} />
                );
            else {
                moreTasks.push(
                    <Task cookies={this.props.cookies} editTaskFromCell={this.editTaskFromCell} removeTaskFromCell={this.removeTaskFromCell} index={j} key={j} task={this.state.tasks[j]} />
                );
            }
        }
        for (let j = 0; j < 19 - this.state.tasks.length; j++) {
            empty.push(
                <div key={j} className="empty"></div>
            );
        }

        //reset the tasks and then reinitialize them
        this.setState({
            tasksHtml:[],
            empty:[],
            moreTasks:[],
        },() => {
            this.setState({
                tasksHtml:currentTasks,
                empty:empty,
                moreTasks: moreTasks
            });
        })
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
        else if(nextProps.deleted.cellIndex === this.state.index && this.state.tasks){
            this.generateTasksHtml();
            this.props.confirmDeleted();
        }
        else if(nextProps.edited.cellIndex === this.state.index && this.state.tasks){
            this.generateTasksHtml();
            this.props.confirmEdited();
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
        deleted: state.schedule.deleted,
        edited: state.schedule.edited,
    }
}

export default connect(mapStateToProps,{setDay,confirmCreated,editTaskFromCell,removeTaskFromCell,confirmDeleted,confirmEdited})(TaskCell);