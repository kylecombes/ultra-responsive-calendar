import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './urc.css';
import MultiDayView from './ui-components/multi-day-view.jsx';
import MonthView from './ui-components/month-view.jsx';
import EventCollection from "./models/event-collection.jsx";

export default class UltraResponsiveCalendar extends Component {

  constructor(props) {
    super(props);

    this.state = {eventsCollection: new EventCollection(props.events)};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events) {
      this.setState({eventsCollection: new EventCollection(nextProps.events)});
    }
  }

  render() {

    let body;

    switch (this.props.viewType) {
      case 'month':
        body = (
          <MonthView
            eventsCollection={this.state.eventsCollection}
            headerFormat={this.props.dayColumnHeaderFormat}
            {...this.props}
          />
        );
        break;
      case 'multi-day':
        body = (
          <MultiDayView
            eventsCollection={this.state.eventsCollection}
            headerFormat={this.props.dayColumnHeaderFormat}
            {...this.props}
          />
        );
        break;
    }

    return (
      <div className="urc">
        {body}
      </div>
    )
  }

}

UltraResponsiveCalendar.propTypes = {
  events: PropTypes.array,
  days: PropTypes.number,
  dayColumnHeaderFormat: PropTypes.string,
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
  dayColumnHeaderFormat: undefined,
  startDate: moment(),
  dayStartHour: 8,
  dayEndHour: 22,
  onEventClick: () => {},
  timezone: 'America/New_York',
  viewType: 'month',
};
