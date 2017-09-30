import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import UltraResponsiveCalendar from '../src/ultra-responsive-calendar.jsx';

export default class SampleApp extends Component {

    onEventClick(calendarEvent, clickEvent) {
        console.log(calendarEvent.title + ' clicked');
    };

    render() {

        let headerContent = <div><h1 style={{marginLeft: "1em"}}>Olin Events</h1></div>;
        let startHour = 9;
        let endHour = 24;

        return (
            <UltraResponsiveCalendar
                header={headerContent}
                numColumns={3}
                startDate={moment()}
                dayStartHour={startHour}
                dayEndHour={endHour}
                onEventClick={this.onEventClick}
            />
        )
    }

}

ReactDOM.render(<SampleApp />, document.getElementById('app'));
