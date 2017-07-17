import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Calendar from './ui-components/calendar.jsx';

export default class App extends Component {

	constructor(props) {
		super(props);


	}

	render() {

        let headerContent = <div><h1 style={{marginLeft: "1em"}}>Olin Events</h1></div>;
        let startHour = 9;
        let endHour = 24;

		return (
			<div className="ultra-responsive-calendar">
				<div className="urc-header">
                    {headerContent}
				</div>
				<div className="urc-body">
                    <Calendar numColumns={3} startDate={moment()} dayStartHour={startHour} dayEndHour={endHour} />
				</div>
			</div>
		)
	}

}
