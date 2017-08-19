export default class EventCollection {

    constructor(events) {
        this.events = (events) ? events : [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    getEventsOnDate(date) {

        let matchingEvents = {};
        for (let i = 0; i < this.events.length; ++i) {
            let event = this.events[i];
            if (event.start.dayOfYear() === date.dayOfYear() && event.start.year() === date.year())
                matchingEvents[event.id] = event;
        }
        return matchingEvents;
    }

}