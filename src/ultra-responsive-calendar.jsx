import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../src/App.css';
import MultiDayView from './ui-components/multi-day-view.jsx';
import MonthView from './ui-components/month-view.jsx';
import moment from 'moment';
import EventCollection from "./models/calendar-event-collection.jsx";

export default class UltraResponsiveCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {eventCollection: new EventCollection(props.events)};
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.events) {
        this.setState({eventCollection: new EventCollection(nextProps.events)});
      }
    }

	render() {

    	let body;

        switch (this.props.viewType) {
            case 'month':
                body = <MonthView eventsCollection={this.state.eventCollection} {...this.props} headerFormat={this.props.dayHeaderFormat} />;
                break;
            case 'multi-day':
                body = <MultiDayView eventsCollection={this.state.eventCollection} {...this.props} headerFormat={this.props.dayHeaderFormat} />;
                break;
        }

		return (
			<div className="ultra-responsive-calendar">
				<div className="urc-header">
            {this.props.header}
				</div>
				<div className="urc-body">
					{body}
				</div>
			</div>
		)
	}

}

UltraResponsiveCalendar.propTypes = {
  events: PropTypes.array,
  header: PropTypes.element,
  days: PropTypes.number,
  startDate: PropTypes.instanceOf(moment),
  dayStartHour: PropTypes.number,
  dayEndHour: PropTypes.number,
  onEventClick: PropTypes.func,
  timezone: PropTypes.string,
  viewType: PropTypes.string,
};

UltraResponsiveCalendar.defaultProps = {
  events: [],
  days: 7,
  startDate: moment(),
  dayStartHour: 8,
  dayEndHour: 22,
  onEventClick: () => {},
  timezone: 'America/New_York',
  viewType: 'month',
};
