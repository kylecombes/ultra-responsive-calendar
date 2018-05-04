import * as React from "react";
import moment from 'moment';
import SideLabel from "./side-label.jsx";
import CalendarColumn from "./column.jsx";
import PropTypes from 'prop-types';
import EventCollection from '../models/event-collection';
import MultiDayHeader from './multi-day-header';

export default class MultiDayView extends React.Component {

    render() {

        if (!this.props.eventsCollection) return null;

        let columns = [];

        let date = moment(this.props.startDate);

        // Generate horizontal grid lines for the hour marks
        const hoursInDay = this.props.dayEndHour - this.props.dayStartHour;
        let horzLines = [];
        for (let i = 0; i < hoursInDay; ++i) {
            horzLines.push(<div key={i} className="urc horizontal-line"/>);
        }

        for (let i = 0; i < this.props.days; ++i) {
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
        <div className="urc-calendar-super-container">
          {this.props.days > 1 && this.props.showHeader &&
            <MultiDayHeader
              startingDay={this.props.startDate}
              days={this.props.days}
              format={this.props.headerFormat}
              marginLeft="4rem"
            />}
          <div className="urc-calendar-container">
            <div className="urc horizontal-lines-container">
              {horzLines}
            </div>
            <SideLabel startHour={this.props.dayStartHour} endHour={this.props.dayEndHour}/>
            <div className={"urc-col-container urc-"+this.props.days+"-col"}>
              {columns}
            </div>
          </div>
        </div>
      );
    }

}

MultiDayView.propTypes = {
  eventsCollection: PropTypes.instanceOf(EventCollection),
  dayStartHour: PropTypes.number,
  dayEndHour: PropTypes.number,
  days: PropTypes.number,
  onEventClick: PropTypes.func.isRequired,
  showHeader: PropTypes.bool,
  headerFormat: PropTypes.string,
  startDate: PropTypes.instanceOf(moment),
};

MultiDayView.defaultProps = {
  dayStartHour: 8,
  dayEndHour: 10,
  days: 7,
  showHeader: true,
  headerFormat: 'ddd M/D',
  startDate: moment(),
};