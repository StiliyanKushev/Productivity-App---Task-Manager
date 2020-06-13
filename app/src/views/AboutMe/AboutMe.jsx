import React from 'react';
import './AboutMe.scss';

import { connect } from 'react-redux';
import { Component } from 'react';
import TaskHandler from '../../handlers/task';

class AboutMeView extends Component {
    constructor(props){
        super(props);

        this.state = {
            stats:[],
            tasksCount: 0
        }

        this.getStatsFor = this.getStatsFor.bind(this);
    }

    lerp (value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

    getStatsFor(dayIndex){
        return this.lerp(0,100,(this.state.stats[dayIndex] * this.state.tasksCount / 100));
    }

    getStats(tasks){
        let results = [0,0,0,0,0,0,0];

        for(let task of tasks){
            let date = task.date;
            results[new Date(date).getDay()]++;
        }

        //regroup so that results start with monday
        let temp = results[0];
        delete results[0];
        results[7] = temp;

        return results;
    }   

    componentDidMount(){
        TaskHandler.getTasks(new Date().getFullYear(),new Date().getMonth() + 1,this.props.cookies.get('token')).then(res => {
            let tasks = res.tasks;
            this.setState({tasksCount:tasks.length,stats:this.getStats(tasks)})
        });
    }

    render(){
        return (
            <div id="aboutme-view">
                <section id="user-info">
                    <div id="image"></div>
                    <form>
                        <div id="pair1">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder={this.props.cookies.get("username")} disabled />
                        </div>
                        <div id="pair2">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder={this.props.cookies.get("email")} disabled />
                        </div>
                    </form>
                </section>
                <p>Educated guess for the busyness of each day of the week</p>
                <section id="user-stats">
                    <div id="item">
                        <p>Monday</p>
                        <p id="percentage">{this.getStatsFor(1)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(1)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Tuesday</p>
                        <p id="percentage">{this.getStatsFor(2)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(2)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Wednesday</p>
                        <p id="percentage">{this.getStatsFor(3)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(3)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Thursday</p>
                        <p id="percentage">{this.getStatsFor(4)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(4)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Friday</p>
                        <p id="percentage">{this.getStatsFor(5)}%</p>
                        <div id="frame">
                            <div style={{width:`${this.getStatsFor(5)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Saturday</p>
                        <p id="percentage">{this.getStatsFor(6)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(6)}%`}}></div>
                        </div>
                    </div>
                    <div id="item">
                        <p>Sunday</p>
                        <p id="percentage">{this.getStatsFor(7)}%</p>
                        <div id="frame">
                        <div style={{width:`${this.getStatsFor(7)}%`}}></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cells: state.schedule.cellsMobile //also works with cells (for desktop)
    }
}

export default connect(mapStateToProps,null)(AboutMeView);