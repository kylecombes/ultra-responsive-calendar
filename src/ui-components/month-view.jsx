import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import EventBox from './event-box.jsx';
import MonthDay from './month-day.jsx'
import MultiDayHeader from './multi-day-header.jsx';

export default class MonthView extends React.Component {

    render() {

        if (!this.props.eventsCollection) return;

        // Find the first day to display on the month calendar (likely a day last month)
        const firstDay = moment(this.props.startDate).date(1).day(0);
        // Find the last day to display on the month calendar (likely a day next month)
        const lastDay = moment(this.props.startDate).date(1).add(1, 'M').subtract(1, 'd');

        const today = moment();

        const numWeeks = lastDay.diff(firstDay, 'weeks');

        const date = moment(firstDay);
        const weeks = [];

        for (let weekNum = 0; weekNum <= numWeeks; ++weekNum) {
            const rowChildren = [];
            for (let dayNum = 0; dayNum < 7; ++dayNum) {
                const events = this.props.eventsCollection.getEventsOnDate(date).map(event => (
                  <EventBox
                    event={event}
                    key={event.id}
                    showDetails={false}
                    onClick={this.props.onEventClick}
                  />
                ));
                const dayClass = (this.props.startDate.month() === date.month() ? 'current-month' : 'adjacent-month')
                                    + (date.isSame(today, 'day') ? ' today' : '');
                rowChildren.push(<MonthDay dayOfMonth={date.format('D')} className={dayClass} key={dayNum}>{events}</MonthDay>);
                date.add(1, 'day');
            }
            weeks.push(<div className="urc-month-row" key={weekNum}>{rowChildren}</div>);
        }


        return (
            <div className="urc-month">
                <MultiDayHeader startingDay={firstDay}/>
                {weeks}
            </div>
        )
    }

}

MonthView.propTypes = {
  headerFormat: PropTypes.string,
  onEventClick: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
};

MonthView.defaultProps = {
  headerFormat: 'ddd',
  onEventClick: () => {},
  startDate: moment(),
};
