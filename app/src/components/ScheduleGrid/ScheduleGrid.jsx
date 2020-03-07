import React from 'react';
import { Component } from 'react';

import TaskHandler from '../../handlers/task';
import Task from '../../components/Task/Task';
import TaskCell from '../../components/TaskCell/TaskCell';

import './ScheduleGrid.scss';

class ScheduleGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {cells:[]};
        this.classifiedCells = this.classifyCells();

        this.classifyCells = this.classifyCells.bind(this);
        this.getClassBy = this.getClassBy.bind(this);
        this.generateCells = this.generateCells.bind(this);
        this.addTask = this.addTask.bind(this);
        this.isCurrent = this.isCurrent.bind(this);
        this.generateWeekdays = this.generateWeekdays.bind(this);
    }

    classifyCells(){
        //fill corners
        let data = {
            1: "corner-tl",
            7: "corner-tr",
            29: "corner-bl",
            35: "corner-br",
        };

        //fill top edges
        for(let i = 2; i <= 6;i++){
            data[i] = "edge-t";
        }

        //fill bottom edges
        for(let i = 30; i <= 34;i++){
            data[i] = "edge-b";
        }

        //fill left edges
        for(let i = 8; i <= 22;i+= 7){
            data[i] = "edge-l";
        }

        //fill right edges
        for(let i = 14; i <= 28;i+= 7){
            data[i] = "edge-r";
        }

        //fill the rest inside (inner)
        for(let i = 9; i <= 27;i++){
            if(data[i] === undefined){
                data[i] = "inner";
            }
        }

        return data;
    }

    isCurrent(day){
        let weekday = new Date(this.props.year,this.props.month - 1,day);
        let current = new Date();

        if(weekday.getDate() === current.getDate()
        && weekday.getMonth() === current.getMonth()
        && weekday.getFullYear() === current.getFullYear()) return 'current';
        return '';
    }

    getClassBy(index){
        return `${this.classifiedCells[index]} ${this.isCurrent(index)}`;
    }

    addTask(index){
        this.props.addTask(index,this.state.cells);
    }

    generateWeekdays(){
        let days = [
            <p key={1}>Monday</p>,
            <p key={2}>Tuesday</p>,
            <p key={3}>Wednesday</p>,
            <p key={4}>Thursday</p>,
            <p key={5}>Friday</p>,
            <p key={6}>Saturday</p>,
            <p key={7}>Sunday</p>,
        ];
        let wd = new Date(this.props.year,this.props.month - 1,1).getDay();
        if(wd === 0) wd = 7;
        
        let newDays = [];
        let i = wd - 1;
        let count = 0;

        while(count < 7){
            newDays.push(days[i++]);
            count++;
            if(i === 7)i = 0;
        }
        
        return newDays;
    }

    async generateCells(){
        let res = await TaskHandler.getTasks(this.props.year,this.props.month,this.props.cookies.get("token"));
        let tasks = res.tasks;
        let cellTasks = [];
        let cells = [];
        let currentMonthDays = new Date(this.props.year,this.props.month,0).getDate();
        
        if(!tasks || tasks.length === 0){
            for(let i = 0; i < currentMonthDays;i++){
                let empty = [];
                for (let j = 0; j < 19; j++) {
                    empty.push(
                        <div key={j} className="empty"></div>
                    );
                }
                cells[i] =
                    <div key={i} className={`item ${this.getClassBy(i + 1)}`}>
                        <p className="date">{i + 1}</p>
                        <div className="innerGrid">
                            {empty}
                            <div className="add-new" onClick={() => this.addTask(i + 1)}><p>+</p></div>
                        </div>
                    </div>;
            }
            for(let i = currentMonthDays; i < 35;i++){
                cells[i] = 
                    <div key={i} className={`item ${this.getClassBy(i + 1)}`}>
                        <p className="date-e">{i + 1}</p>
                    </div>;
            }
            return cells;
        }

        //fill with empty arrays
        for(let i = 0; i < 35; i++){
            cellTasks[i] = [];
        }

        //fill cellTasks
        for(let i = 0; i < 35; i++){
            let cellDate = new Date(this.props.year,this.props.month - 1,i + 1);
            if(cellDate !== "Invalid Date"){
                //put all tasks for this date in the cell
                for(let j = 0; j < tasks.length; j++){
                    let taskDate = new Date(tasks[j].date);
                    if(cellDate.getDate() === taskDate.getDate()){ // this task is for this cell
                        cellTasks[i].push(tasks[j]);
                        tasks.splice(j--,1);
                    }
                }
            }
        }

        //generate html (fill cells)
        for(let i = 0; i < 35; i++){
            if(cellTasks[i].length === 0){ // no tasks for this cell
                if(i + 1 > currentMonthDays){
                    cells[i] = 
                    <div key={i} className={`item ${this.getClassBy(i + 1)}`}>
                        <p className="date-e">{i + 1}</p>
                    </div>;
                }
                else{
                    let empty = [];
                    for(let j = 0; j < 19 - cellTasks[i].length;j++){
                        empty.push(
                            <div key={j} className="empty"></div>
                        );
                    }
                    cells[i] = <TaskCell addTask={this.addTask} getClassBy={this.getClassBy} key={i} keyI={i} empty={empty}/>
                }
            }

            else{
                let currentTasks = [];
                let moreTasks = [];
                for(let j = 0; j < cellTasks[i].length;j++){
                    if(j < 18)
                    currentTasks.push(
                        <Task key={j} task={cellTasks[i][j]}/>
                    );
                    else{
                        moreTasks.push(
                            <Task key={j} task={cellTasks[i][j]}/>
                        );
                    }
                }

                let empty = [];
                for(let j = 0; j < 19 - cellTasks[i].length;j++){
                    empty.push(
                        <div key={j} className="empty"></div>
                    );
                }

                cells[i] = <TaskCell addTask={this.addTask} getClassBy={this.getClassBy} key={i} keyI={i} tasks={currentTasks} empty={empty} moreTasks={moreTasks}/>
            }
        }
        return cells;
    }

    async fetchSingleCell(year,month,day){
        //get all of the tasks
        let res = await TaskHandler.getTask(year,month,day,this.props.cookies.get("token"));

        let tasks = res.tasks;

        let currentTasks = [];
        let moreTasks = [];
        for (let j = 0; j < tasks.length; j++) {
            if (j < 18)
                currentTasks.push(
                    <Task key={j} task={tasks[j]} />
                );
            else {
                moreTasks.push(
                    <Task key={j} task={tasks[j]} />
                );
            }
        }

        let empty = [];
        for (let j = 0; j < 19 - tasks.length; j++) {
            empty.push(
                <div key={j} className="empty"></div>
            );
        }

        let cell = 
                <TaskCell 
                addTask={this.addTask} 
                getClassBy={this.getClassBy} 
                key={day} 
                keyI={day} 
                tasks={currentTasks} 
                empty={empty} 
                moreTasks={moreTasks}/>

        return cell;
    }

    async componentDidMount(){
        let cells = this.props.preCells || await this.generateCells();
        if(this.props.modifiedCell){
           this.fetchSingleCell(this.props.year,this.props.month - 1,this.props.modifiedCell);
        }
        this.setState({cells});
    }

    render() {
        return (
            <div id="grid">
                {this.generateWeekdays()}
                {this.state.cells}
            </div>
        );
    }
}

export default ScheduleGrid;