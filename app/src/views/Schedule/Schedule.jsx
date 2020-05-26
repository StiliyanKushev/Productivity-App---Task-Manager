import React, { Fragment, Component } from 'react';

import './Schedule.scss';
import ScheduleGrid from '../../components/ScheduleGrid/ScheduleGrid';
import ScheduleGridMobile from '../../components/ScheduleGrid/ScheduleGridMobile';
import DateSwitcher from "../../components/DateSwitcher/DateSwitcher";
import CreateTask from '../../components/CreateTask/CreateTask';

class ScheduleView extends Component {
    constructor(props){
        super(props);

        this.state = {
            isDesktopMode: window.innerWidth > 1090
        }

        this.calcMode = this.calcMode.bind(this);
    }

    calcMode(){
        this.setState({isDesktopMode: window.innerWidth > 1090});
    }

    componentDidMount(){
        window.addEventListener('resize', this.calcMode);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.calcMode);
    }

    render(){        
        return (
            <div id="schedule-view">
                <DateSwitcher/>
                {this.state.isDesktopMode ?
                    <Fragment>
                        <CreateTask cookies={this.props.cookies} />
                        <ScheduleGrid cookies={this.props.cookies} />
                    </Fragment>
                :
                    <Fragment>
                        <CreateTask cookies={this.props.cookies} fullscreen={true} />
                        <ScheduleGridMobile cookies={this.props.cookies} />
                    </Fragment>
                }
            </div>
        );
    }
}

export default ScheduleView;