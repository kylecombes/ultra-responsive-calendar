import * as React from "react";
import moment from "moment";
import CalendarColumn from "./column.jsx";
const CalendarEvent = require("../models/calendar-event.jsx").default;
const EventCollection = require("../models/calendar-event-collection.jsx").default;

export default class Calendar extends React.Component {

    // This is going to be the most awesome, responsive src EVER!!!

    constructor(props) {
        super(props);

        let events = [];
        let start = moment();
        let end = moment();
        end.add(1, 'h');
        for (let i = 0; i < 10; ++i) {
            let event = new CalendarEvent('Testing '+i, start, end);
            events.push(event);
            start.add(2, 'h');
            end.add(2, 'h');
        }

        this.state = {eventCollection: new EventCollection(events)};
    }


    render() {

        let columns = [];

        let date = this.props.startDate;
        date.add(1, 'd');

        for (let i = 0; i < this.props.numColumns; ++i) {
            let events = this.state.eventCollection.getEventsOnDate(date);
            let column = <CalendarColumn events={events} id={'cal-col-'+i} columnNumber={i} key={i} />;
            columns.push(column);
        }

        // Get date range to display
        // Get events on each day

        return (
            <div className={"responsive-src "+this.props.numColumns+"-col-src"}>
                {columns}
            </div>
        )
    }

}