import React, { Component } from 'react';

import './DateSwitcher.scss';
import { connect } from 'react-redux';
import {
    incrementYear,
    incrementMonth,
    decrementYear,
    decrementMonth
} from '../../actions/scheduleActions';

class DateSwitcher extends Component {
    constructor(props){
        super(props);
        
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
    }

    formatMonth(){
        let tempDate = new Date(this.props.year,this.props.month - 1,1);
        return tempDate.toLocaleString('default', { month: 'long' });
    }

    changeMonth(v){
        if(v === +1){
            this.props.incrementMonth();
        }
        else if(v === -1){
            this.props.decrementMonth();
        }
    }

    changeYear(v){
        if(v === +1){
            this.props.incrementYear();
        }
        else if(v === -1){
            this.props.decrementYear();
        }
    }

    render(){
        return (
            <div id="date-switcher">
                <div className="year-con container">
                    <p>Year</p>
                    <div className="switch">
                        <button className="left" onClick={() => this.changeYear(-1)}></button>
                        <p className="value">{this.props.year}</p>
                        <button className="right" onClick={() => this.changeYear(+1)}></button>
                    </div>
                </div>
                <div className="month-con container">
                    <p id="month">Month</p>
                    <div className="switch">
                        <button className="left" onClick={() => this.changeMonth(-1)}></button>
                        <p className="value">{this.formatMonth()}</p>
                        <button className="right" onClick={() => this.changeMonth(+1)}></button>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        year: state.schedule.year,
        month: state.schedule.month,
    }
}

export default connect(mapStateToProps,{
    incrementYear,
    incrementMonth,
    decrementYear,
    decrementMonth
})(DateSwitcher);