import React from 'react';

import './Schedule.scss';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';
import CreateTask from '../../components/CreateTask/CreateTask';

const ScheduleView  = (props) => {
    return (
        <div id="schedule-view">
            <ScheduleGrid cookies={props.cookies}/>
            <CreateTask cookies={props.cookies}/>
        </div>
    );
}

export default ScheduleView;