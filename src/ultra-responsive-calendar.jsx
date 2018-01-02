import React, { Component } from 'react';
import '../src/App.css';
import MultiDayView from './ui-components/multi-day-view.jsx';
import MonthView from './ui-components/month-view.jsx';
import moment from 'moment';
import EventCollection from "./models/calendar-event-collection.jsx";

export default class UltraResponsiveCalendar extends Component {

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
                    start: moment().hours(34).minutes(0),
                    end: moment().hours(38).minutes(0)
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
                    start: moment().hours(36).minutes(30),
                    end: moment().hours(40).minutes(0)
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

    componentWillReceiveProps(nextProps) {
        this.setState({eventCollection: new EventCollection(nextProps.events)});
    }

	render() {

    	let body;

    	const viewMode = this.props.viewType || 'month';

        switch (this.props.viewType) {
            case 'month':
                body = <MonthView eventsCollection={this.state.eventCollection} {...this.props} />;
                break;
            case 'multi-day':
                body = <MultiDayView eventsCollection={this.state.eventCollection} {...this.props} />;
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
