import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import UltraResponsiveCalendar from '../src/ultra-responsive-calendar.jsx';

class SampleApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMode: 'month',
            viewMode: 'month',
            multiViewDays: 0,
            events: [
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
                end: moment().hours(13).minutes(30),
                allDay: true,
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
              {
                id: 7,
                title: 'Event H',
                location: 'O',
                start: moment().add(2,'d').hours(0).minutes(15),
                end: moment().add(2,'d').hours(23).minutes(0)
              },
            ],
    };
    }

    onEventClick = (calendarEvent, clickEvent) => {
        console.log(calendarEvent.title + ' clicked');
    };

    modeChange = (event) => {
        switch (event.target.value) {
            case 'month':
                this.setState({selectedMode: 'month', viewMode: 'month', multiViewDays: 0});
                break;
            case 'week':
                this.setState({selectedMode: 'week', viewMode: 'multi-day', multiViewDays: 7});
                break;
            case '3-day':
                this.setState({selectedMode: '3-day', viewMode: 'multi-day', multiViewDays: 3});
                break;
            case '1-day':
                this.setState({selectedMode: '1-day', viewMode: 'multi-day', multiViewDays: 1});
                break;
            case 'agenda':
                this.setState({selectedMode: 'agenda', viewMode: 'multi-day', multiViewDays: 1});
                break;

        }
    };

    render() {
        let startHour = 9;
        let endHour = 24;

        return (
          <div className="main-container">
            <div className="header">
              <h1 style={{marginLeft: "1em", display: 'inline-block'}}>Olin Events</h1>
              <form name="urc-sample-header-view-toggle">
                <input id="urc-view-month" type="radio" name="view" value="month" onChange={this.modeChange} checked={this.state.selectedMode === 'month'}/>
                <label htmlFor="urc-view-month">Month</label>
                <input id="urc-view-week" type="radio" name="view" value="week" onChange={this.modeChange} checked={this.state.selectedMode === 'week'}/>
                <label htmlFor="urc-view-week">Week</label>
                <input id="urc-view-3-day" type="radio" name="view" value="3-day" onChange={this.modeChange} checked={this.state.selectedMode === '3-day'}/>
                <label htmlFor="urc-view-3-day">3 Days</label>
                <input id="urc-view-1-day" type="radio" name="view" value="1-day" onChange={this.modeChange} checked={this.state.selectedMode === '1-day'}/>
                <label htmlFor="urc-view-1-day">1 Day</label>
                <input id="urc-view-agenda" type="radio" name="view" value="agenda" onChange={this.modeChange} checked={this.state.selectedMode === 'agenda'}/>
                <label htmlFor="urc-view-agenda">Agenda</label>
              </form>
            </div>
            <UltraResponsiveCalendar
                days={this.state.multiViewDays}
                startDate={moment()}
                dayStartHour={startHour}
                dayEndHour={endHour}
                onEventClick={this.onEventClick}
                viewType={this.state.viewMode}
                events={this.state.events}
            />
          </div>
        )
    }

}

ReactDOM.render(<SampleApp />, document.getElementById('app'));
