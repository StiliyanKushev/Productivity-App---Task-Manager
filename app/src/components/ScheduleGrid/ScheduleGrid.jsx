import React from 'react';
import { Component } from 'react';

import TaskHandler from '../../handlers/task';
import TaskCell from '../../components/TaskCell/TaskCell';
import {connect} from 'react-redux';
import {setCells} from '../../actions/scheduleActions';

import './ScheduleGrid.scss';

class ScheduleGrid extends Component {
    constructor(props) {
        super(props);

        this.classifiedCells = this.classifyCells();

        this.classifyCells = this.classifyCells.bind(this);
        this.getClassBy = this.getClassBy.bind(this);
        this.isCurrent = this.isCurrent.bind(this);

        this.generateCells = this.generateCells.bind(this);
        this.fetchCells = this.fetchCells.bind(this);
        
        this.generateWeekdays = this.generateWeekdays.bind(this);
        this.currentMonthDays = new Date(this.props.year,this.props.month,0).getDate();
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

    componentDidMount(){
        // if the cells havent been fetched yet
        if(!this.props.fetched){
            this.generateCells();   // render the empty grid
            this.fetchCells();      // render the fetched grid when cells are fetched
        }
    }


    fetchCells(){
        TaskHandler.getTasks(this.props.year,this.props.month,this.props.cookies.get("token"))
        .then(res => {
            let tasks = res.tasks;
            let cellTasks = [];
            let cells = [];

            //fill with empty arrays
            for (let i = 0; i < 35; i++) {
                cellTasks[i] = [];
            }

            //fill cellTasks
            for (let i = 0; i < 35; i++) {
                let cellDate = new Date(this.props.year, this.props.month - 1, i + 1);
                if (cellDate !== "Invalid Date") {
                    //put all tasks for this date in the cell
                    for (let j = 0; j < tasks.length; j++) {
                        let taskDate = new Date(tasks[j].date);
                        if (cellDate.getDate() === taskDate.getDate()) { // this task is for this cell
                            cellTasks[i].push(tasks[j]);
                            tasks.splice(j--, 1);
                        }
                    }
                }
            }

            for(let i = 0; i < 35;i++){
                if(i + 1 > this.currentMonthDays){
                    cells[i] = <TaskCell
                            getClassBy={this.getClassBy}
                            key={i + "fetched"} 
                            index={i}
                            cookies={this.props.cookies} />
                }
                else{
                cells[i] = <TaskCell
                            getClassBy={this.getClassBy}
                            key={i + "fetched"} 
                            index={i}
                            tasks={cellTasks[i]}
                            cookies={this.props.cookies} />
                }
            }
            
            this.props.setCells(cells);
        });
    }

    generateCells(){
        let cells = [];

        //generate template html
        for (let i = 0; i < 35; i++) {
            if(i + 1 > this.currentMonthDays){
                cells[i] = <TaskCell
                        getClassBy={this.getClassBy}
                        key={i} 
                        index={i} />
            }
            else{
            cells[i] = <TaskCell
                        getClassBy={this.getClassBy}
                        key={i} 
                        index={i}
                        tasks={[]} />
            }
        }

        this.props.setCells(cells);
    }

    render() {
        return (
            <div id="grid">
                {this.generateWeekdays()}
                {this.props.cells}
            </div>
        );
    }
}

const mapStateToProps = (state) => { 
    return {
        year: state.schedule.year,
        month: state.schedule.month,
        cells: state.schedule.cells,
        fetched: state.schedule.fetched
    }
}

export default connect(mapStateToProps,{setCells})(ScheduleGrid);