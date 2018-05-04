import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import EventBox from './event-box.jsx';
import MonthDay from './month-day.jsx'
import MultiDayHeader from './multi-day-header.jsx';
import EventsCollection from '../models/event-collection';

export default class MonthView extends React.Component {

    render() {
        // Determine all the significant dates
        // Find the first day to display on the month calendar (likely a day last month)
        const firstDay = moment(this.props.startDate).date(1).day(0);
        // Find the last day to display on the month calendar (likely a day next month)
        const lastDay = moment(this.props.startDate).date(1).add(1, 'M').subtract(1, 'd');
        const today = moment();
        // Determine how many weeks we'll be showing
        const numWeeks = lastDay.diff(firstDay, 'weeks') + 1;

        const tempDate = moment(firstDay);
        const weekRowElems = []; // React elements for each row/week on the calendar

        for (let weekNum = 0; weekNum < numWeeks; ++weekNum) { // For each week to show
            const dayElems = []; // React elements for each day of the week
            for (let dayNum = 0; dayNum < 7; ++dayNum) { // For each day of that week
                // Get the events on that day and create an EventBox for each
                const events = this.props.eventsCollection.getEventsOnDate(tempDate).map(event => (
                  <EventBox
                    event={event}
                    key={event.id}
                    showDetails={false}
                    onClick={this.props.onEventClick}
                  />
                ));
                // Determine if any special classes should be applied to the HTML element for this day
                const dayClass = (this.props.startDate.isSame(tempDate, 'month') ? 'current-month' : 'adjacent-month')
                                    + (tempDate.isSame(today, 'day') ? ' today' : '');
                // Add a React MonthDay element for this day to our list of day elements for this week
                dayElems.push(<MonthDay dayOfMonth={tempDate.format('D')} className={dayClass} key={dayNum}>{events}</MonthDay>);
                // Progress to the next day
                tempDate.add(1, 'day');
            }
            // Add a new div (a week row) containing these day elements to the calendar
            weekRowElems.push(<div className="urc-month-row" key={weekNum}>{dayElems}</div>);
        }


        return (
            <div className="urc-month">
                <MultiDayHeader startingDay={firstDay}/>
                {weekRowElems}
            </div>
        )
    }

}

MonthView.propTypes = {
  dayHeaderFormat: PropTypes.string,
  eventsCollection: PropTypes.instanceOf(EventsCollection).isRequired,
  onDayClick: PropTypes.func,
  onEventClick: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
};

MonthView.defaultProps = {
  dayHeaderFormat: 'ddd',
  onDayClick: () => {},
  onEventClick: () => {},
  startDate: moment(),
};
