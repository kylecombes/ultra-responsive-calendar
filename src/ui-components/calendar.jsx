import * as React from "react";
import SideLabel from "./side-label.jsx";
import CalendarColumn from "./column.jsx";
import EventCollection from "../models/calendar-event-collection.jsx";

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {eventCollection: new EventCollection(props.events)};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({eventCollection: new EventCollection(nextProps.events)});
    }

    render() {

        if (!this.state.eventCollection) return null;

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
                            eventClick={this.props.eventClick}
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