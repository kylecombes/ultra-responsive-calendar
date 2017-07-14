import * as React from "react";
import moment from "moment";
import SideLabel from "./side-label.jsx";
import CalendarColumn from "./column.jsx";
const CalendarEvent = require("../models/calendar-event.jsx").default;
const EventCollection = require("../models/calendar-event-collection.jsx").default;

export default class Calendar extends React.Component {

    // This is going to be the most awesome, responsive src EVER!!!

    constructor(props) {
        super(props);

        let events = [];
        let startOffset = 0;
        for (let i = 0; i < 10; ++i) {
            let start = moment();
            let end = moment();
            start.add(startOffset, 'h');
            end.add(startOffset+1, 'h');
            let event = new CalendarEvent('Testing '+i, start, end);
            events.push(event);
            startOffset += 4;
        }

        let start = moment();
        let end = moment();
        start.add(1.5, 'h');
        end.add(2.5, 'h');
        events.push(new CalendarEvent('Offset event', start, end));

        this.state = {eventCollection: new EventCollection(events)};
    }


    render() {

        let columns = [];

        let date = this.props.startDate;

        for (let i = 0; i < this.props.numColumns; ++i) {
            let events = this.state.eventCollection.getEventsOnDate(date);
            let column = <CalendarColumn
                            events={events}
                            id={'cal-col-'+i}
                            columnNumber={i}
                            key={i}
                            dayStartHour={this.props.dayStartHour}
                            dayEndHour={this.props.dayEndHour} />;
            columns.push(column);
            date.add(1, 'd');
        }

        // Get date range to display
        // Get events on each day

        return (
            <div className="urc-calendar-container">
                <SideLabel startHour={this.props.dayStartHour} endHour={this.props.dayEndHour}/>
                <div className={"urc-col-container urc-"+this.props.numColumns+"-col"}>
                    {columns}
                </div>
            </div>
        )
    }

}