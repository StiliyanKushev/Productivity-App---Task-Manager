import React from 'react';
import { Component } from 'react';

import TaskHandler from '../../handlers/task';
import TaskRow from '../../components/TaskRow/TaskRow';
import { connect } from 'react-redux';
import { setCellsMobile } from '../../actions/scheduleActions';

import './ScheduleGridMobile.scss';

class ScheduleGridMobile extends Component {
	constructor(props) {
		super(props);

		this.generateCells = this.generateCells.bind(this);
		this.fetchCells = this.fetchCells.bind(this);
		this.currentMonthDays = new Date(this.props.year, this.props.month, 0).getDate();
	}

	componentDidMount(){
        // if the cells havent been fetched yet
        if(!this.props.fetchedMobile){
            this.generateCells();   // render the empty grid
            this.fetchCells();      // render the fetched grid when cells are fetched
        }
    }

	fetchCells(y,m){
		TaskHandler.getTasks(y || this.props.year,m || this.props.month,this.props.cookies.get("token"))
        .then(res => {
            let tasks = res.tasks;
            let cellTasks = [];
            let cells = [];

            //fill with empty arrays
            for (let i = 0; i < this.currentMonthDays; i++) {
                cellTasks[i] = [];
            }

            //fill cellTasks
            for (let i = 0; i < this.currentMonthDays; i++) {
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

            for (let i = 0; i < this.currentMonthDays; i++) {
				cells[i] = <TaskRow
					isLast={i + 1 === this.currentMonthDays}
					key={i + "fetched"}
					index={i}
					tasks={cellTasks[i]} />
			}
            
            this.props.setCellsMobile(cells);
        });
	}

	generateCells() {
		let cells = [];

		//generate template html
		for (let i = 0; i < this.currentMonthDays; i++) {
			cells[i] = <TaskRow
				isLast={i + 1 === this.currentMonthDays}
				key={i}
				index={i}
				//tasks={[]}
				/>
		}

		this.props.setCellsMobile(cells);
	}

	componentWillReceiveProps(newProps) {
		this.currentMonthDays = new Date(this.props.year, this.props.month, 0).getDate();
		if (this.props.year !== newProps.year || this.props.month !== newProps.month) {
			this.generateCells();   // render the empty grid
			this.fetchCells(newProps.year,newProps.month);      // render the fetched grid when cells are fetched
		}
	}

	render() {
		return (
			<div id="mobile-grid">
				{this.props.cellsMobile}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		year: state.schedule.year,
		month: state.schedule.month,
		cellsMobile: state.schedule.cellsMobile,
		fetchedMobile: state.schedule.fetchedMobile
	}
}

export default connect(mapStateToProps, { setCellsMobile })(ScheduleGridMobile);