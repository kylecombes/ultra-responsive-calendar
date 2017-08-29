import React, { Component } from 'react';
import '../src/App.css';
import Calendar from './ui-components/calendar.jsx';

export default class UltraResponsiveCalendar extends Component {

	render() {
		return (
			<div className="ultra-responsive-calendar">
				<div className="urc-header">
                    {this.props.header}
				</div>
				<div className="urc-body">
                    <Calendar {...this.props} />
				</div>
			</div>
		)
	}

}
