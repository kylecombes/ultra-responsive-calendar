import * as React from "react";
import moment from "moment";
import SideLabel from "./side-label.jsx";
import CalendarColumn from "./column.jsx";
import EventCollection from "../models/calendar-event-collection.jsx";

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.sampleEvents =
            [
                {
                    id: 0,
                    title: 'Event A',
                    location: 'MH 203',
                    start: moment().hours(12).minutes(0),
                    end: moment().hours(15).minutes(0)
                },
                {
                    id: 1,
                    title: 'Event B',
                    location: 'Newton, MA',
                    start: moment().hours(13).minutes(0),
                    end: moment().hours(16).minutes(0)
                },
                {
                    id: 2,
                    title: 'Event C',
                    location: 'AC306',
                    start: moment().hours(13).minutes(0),
                    end: moment().hours(13).minutes(30)
                },
                {
                    id: 3,
                    title: 'Event D',
                    location: 'Great Lawn',
                    start: moment().hours(14).minutes(30),
                    end: moment().hours(18).minutes(0)
                },
                {
                    id: 7,
                    title: 'Event I',
                    location: 'DH',
                    start: moment().hours(16).minutes(30),
                    end: moment().hours(17).minutes(0)
                },
                {
                    id: 4,
                    title: 'Event E',
                    location: 'Newton, MA',
                    start: moment().hours(20).minutes(0),
                    end: moment().hours(23).minutes(55)
                },
                {
                    id: 5,
                    title: 'Event F',
                    location: 'WH2AL',
                    start: moment().hours(19).minutes(45),
                    end: moment().hours(21).minutes(0)
                },
                {
                    id: 6,
                    title: 'Event G',
                    location: '12 Mass Turnpike',
                    start: moment().add(1,'d').hours(10).minutes(15),
                    end: moment().add(1,'d').hours(12).minutes(0)
                },
            ];

        this.state = {eventCollection: new EventCollection(props.events || this.sampleEvents)};
    }

    onComponentWillReceiveProps(nextProps) {
        this.setState({eventCollection: new EventCollection(nextProps.events || this.sampleEvents)});
    }

    render() {

        let columns = [];

        let date = this.props.startDate;

        // Generate horizontal grid lines for the hour marks
        const hoursInDay = this.props.dayEndHour - this.props.dayStartHour;
        let horzLines = [];
        for (let i = 0; i < hoursInDay; ++i) {
            horzLines.push(<div className="urc-horizontal-line"/>);
        }

        for (let i = -1; i < this.props.numColumns; ++i) {
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

        return (
            <div className="urc-calendar-container">
                <div className="urc-horizontal-lines-container">
                    {horzLines}
                </div>
                <SideLabel startHour={this.props.dayStartHour} endHour={this.props.dayEndHour}/>
                <div className={"urc-col-container urc-"+this.props.numColumns+"-col"}>
                    {columns}
                </div>
            </div>
        )
    }

}