import * as React from 'react';
import EventBox from './event-box.jsx';

export default class CalendarColumn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {classes: this.getClasses(props)};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({classes: this.getClasses(nextProps)});
    }

    getClasses(props) {
        let classes = ['urc-column'];
        if (props) {
            classes.push('col-num-' + props.columnNumber);
            Object.assign(classes, props.classes);
        }
        return classes;
    }

    calculatePacking(events, dayStartMinute, dayEndMinute, minutesPerPeriod) {
        const maxWidthEachEvent = {};

        // Determine the info for each time period
        const periods = [];
        const numPeriods = (dayEndMinute - dayStartMinute) / minutesPerPeriod;
        for (let i = 0; i <= numPeriods; ++i) {
            const periodStartMinute = dayStartMinute + i * minutesPerPeriod;
            const periodEndMinute = periodStartMinute + minutesPerPeriod;
            const eventsThisPeriod = this.eventsOccurringDuringPeriod(events, maxWidthEachEvent, periodStartMinute, periodEndMinute, i);
            periods.push({
                startMinute: periodStartMinute,
                endMinute: periodEndMinute,
                events: eventsThisPeriod,
                percentFilled: 0,
            });
        }

        // Determine the layout info for each event
        const result = [];
        const processedEvents = [];
        periods.forEach(period => {
            for (let i = 0; i < period.events.length; ++i) {
                const eventId = period.events[i];
                if (processedEvents.indexOf(eventId) < 0) {
                    const event = events[eventId];
                    const maxWidth = maxWidthEachEvent[eventId];

                    const left = this.findMinLeftPos(event, periods);
                    const right = 1 - left - (1 / maxWidth);
                    result.push({
                        id: eventId,
                        left: left * 100,
                        right: right * 100,
                    });
                    this.fillPeriodsForEvent(events[eventId], 1/maxWidth, periods, dayStartMinute, dayEndMinute, minutesPerPeriod);
                    processedEvents.push(eventId);
                }
            }
        });

        return result;
    };

    findMinLeftPos(event, periods) {
        let minLeft = 0;
        for (let i = event.startPeriodIndex; i <= event.endPeriodIndex; ++i) {
            if (periods[i].percentFilled > minLeft)
                minLeft = periods[i].percentFilled;
        }
        return minLeft;
    }

    fillPeriodsForEvent(event, width, periods) {
        const startIndex = event.startPeriodIndex;
        const endIndex = event.endPeriodIndex;
        for (let i = startIndex; i <= endIndex; ++i) {
            periods[i].percentFilled += width;
        }
    }

    eventOccursDuringPeriod(event, periodStartMinute, periodEndMinute) {
        const eventStartMinute = event.start.hour()*60 + event.start.minute();
        const eventEndMinute = event.end.hour()*60 + event.end.minute();
        return eventStartMinute < periodEndMinute && periodStartMinute < eventEndMinute;
    }

    eventsOccurringDuringPeriod(eventsList, maxWidthEachEvent, periodStartMinute, periodEndMinute, periodIndex) {

        let eventsDuringPeriod = [];
        for (let i = 0; i < eventsList.length; ++i) {
            const event = eventsList[i];
            if (this.eventOccursDuringPeriod(event, periodStartMinute, periodEndMinute)) {
                if (!event.hasOwnProperty('startPeriodIndex')) {
                    event.startPeriodIndex = periodIndex;
                }
                event.endPeriodIndex = periodIndex;
                // Event occurs during this period, so add it to our list
                eventsDuringPeriod.push(event.id);
            }
        }

        const numEvents = eventsDuringPeriod.length;
        eventsDuringPeriod.forEach(eventId => {
            if (eventId in maxWidthEachEvent) {
                if (maxWidthEachEvent[eventId] < numEvents) {
                    maxWidthEachEvent[eventId] = numEvents;
                }
            } else {
                maxWidthEachEvent[eventId] = numEvents;
            }
        });
        return eventsDuringPeriod;
    };

    getStartPos(event, dayStartMinute, hoursInDay) {
        // Returns the percentage from the top of the containing element the top of the event element should be
        let eventStartHour = event.start.hour()*60 + event.start.minute();
        return (eventStartHour - dayStartMinute) / hoursInDay * 100;
    }

    getEndPos(event, dayEndMinute, hoursInDay) {
        // Returns the percentage from the bottom of the containing element the bottom of the event element should be
        let eventEndMinute = event.end.hour()*60 + event.end.minute();
        return (dayEndMinute - eventEndMinute) / hoursInDay * 100;
    }

    calculateEventBoxClassesStyles(event, packingInfo, minutesInDay) {
        const classes = [];
        let top = this.getStartPos(event, this.props.dayStartHour*60, minutesInDay);
        let bottom = this.getEndPos(event, this.props.dayEndHour*60, minutesInDay);

        // Calculate CSS classes
        if (top === 0)
            classes.push('against-top');
        if (bottom === 0)
            classes.push('against-bottom');
        if (packingInfo.left === 0)
            classes.push('against-left');
        if (packingInfo.right === 0)
            classes.push('against-right');
        if (top < 0) {
            classes.push('extends-before-viewport');
            top = '-1vh';
        } else {
            top = `${top}%`;
        }
        if (bottom < 0) {
            classes.push('extends-after-viewport');
            bottom = '-1vh';
        } else {
            bottom = `${bottom}%`;
        }

        // Calculate inline styles
        const styles = {
            top: top,
            bottom: bottom,
            left: `${packingInfo.left}%`,
            right: `${packingInfo.right}%`,
        };
        return [classes.join(' '), styles];
    }

    render() {

        let events = [];

        let hoursInDay = this.props.dayEndHour - this.props.dayStartHour;
        let eventPackingInfo = this.calculatePacking(this.props.events, this.props.dayStartHour*60, this.props.dayEndHour*60, 15);

        for (let i = 0; i < eventPackingInfo.length; ++i) {
            const packingInfo = eventPackingInfo[i];
            if (packingInfo) { // Event is during this time period TODO Better way of doing this
                let event = this.props.events[packingInfo.id];
                const [classes, styles] = this.calculateEventBoxClassesStyles(event, packingInfo, hoursInDay*60);
                events.push(<EventBox event={event} styles={styles} onClick={this.props.onEventClick} className={classes} key={i}/>);
            }
        }

        return (
            <div id={this.props.id} className={this.state.classes.join(' ')}>
                {events}
            </div>
        )
    }

}