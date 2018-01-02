import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import UltraResponsiveCalendar from '../src/ultra-responsive-calendar.jsx';

export default class SampleApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMode: 'month',
            viewMode: 'month',
            multiViewDays: 0,

        }
        this.modeChange = this.modeChange.bind(this);
    }

    onEventClick(calendarEvent, clickEvent) {
        console.log(calendarEvent.title + ' clicked');
    };

    modeChange(event) {
        switch (event.target.value) {
            case 'month':
                this.setState({selectedMode: 'month', viewMode: 'month', multiViewDays: 0});
                break;
            case 'week':
                this.setState({selectedMode: 'week', viewMode: 'multi-day', multiViewDays: 7});
                break;
            case '3-day':
                this.setState({selectedMode: '3-day', viewMode: 'multi-day', multiViewDays: 3});
                break;
            case '1-day':
                this.setState({selectedMode: '1-day', viewMode: 'multi-day', multiViewDays: 1});
                break;
            case 'agenda':
                this.setState({selectedMode: 'agenda', viewMode: 'multi-day', multiViewDays: 1});
                break;

        }
    }

    render() {

        let headerContent = <div>
            <h1 style={{marginLeft: "1em", display: 'inline-block'}}>Olin Events</h1>
            <form name="urc-sample-header-view-toggle">
                <input id="urc-view-month" type="radio" name="view" value="month" onChange={this.modeChange} checked={this.state.selectedMode === 'month'}/>
                <label htmlFor="urc-view-month">Month</label>
                <input id="urc-view-week" type="radio" name="view" value="week" onChange={this.modeChange} checked={this.state.selectedMode === 'week'}/>
                <label htmlFor="urc-view-week">Week</label>
                <input id="urc-view-3-day" type="radio" name="view" value="3-day" onChange={this.modeChange} checked={this.state.selectedMode === '3-day'}/>
                <label htmlFor="urc-view-3-day">3 Days</label>
                <input id="urc-view-1-day" type="radio" name="view" value="1-day" onChange={this.modeChange} checked={this.state.selectedMode === '1-day'}/>
                <label htmlFor="urc-view-1-day">1 Day</label>
                <input id="urc-view-agenda" type="radio" name="view" value="agenda" onChange={this.modeChange} checked={this.state.selectedMode === 'agenda'}/>
                <label htmlFor="urc-view-agenda">Agenda</label>
            </form>
        </div>;
        let startHour = 9;
        let endHour = 24;

        return (
            <UltraResponsiveCalendar
                header={headerContent}
                days={this.state.multiViewDays}
                startDate={moment()}
                dayStartHour={startHour}
                dayEndHour={endHour}
                onEventClick={this.onEventClick}
                viewType={this.state.viewMode}
            />
        )
    }

}

ReactDOM.render(<SampleApp />, document.getElementById('app'));
