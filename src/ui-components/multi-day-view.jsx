import * as React from "react";
import SideLabel from "./side-label.jsx";
import CalendarColumn from "./column.jsx";

export default class MultiDayView extends React.Component {

    render() {

        if (!this.props.eventsCollection) return null;

        let columns = [];

        let date = this.props.startDate;

        // Generate horizontal grid lines for the hour marks
        const hoursInDay = this.props.dayEndHour - this.props.dayStartHour;
        let horzLines = [];
        for (let i = 0; i < hoursInDay; ++i) {
            horzLines.push(<div className="urc-horizontal-line"/>);
        }

        for (let i = -1; i < this.props.numColumns; ++i) {
            let events = this.props.eventsCollection.getEventsOnDate(date);
            let column = <CalendarColumn
                            events={events}
                            id={'cal-col-'+i}
                            columnNumber={i}
                            key={i}
                            onEventClick={this.props.onEventClick}
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