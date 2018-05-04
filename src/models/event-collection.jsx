export default class EventCollection {

    constructor(events) {
        this.events = events || [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    getEventsOnDate(date) {

        let matchingEvents = [];
        for (let i = 0; i < this.events.length; ++i) {
            let event = this.events[i];
            if (event.start.isSame(date, 'day'))
                matchingEvents.push(event);
        }

        // Sort events by start time
        matchingEvents.sort((a, b) => a.start.diff(b.start));

        return matchingEvents;
    }

}