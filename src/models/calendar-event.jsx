// import moment from 'moment';

export default class CalendarEvent {

    constructor(id, name, start, end, view_url, edit_url, extraData) {

        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.view_url = view_url;
        this.edit_url = edit_url;
        this.extraData = extraData;


        this.getStartPos = this.getStartPos.bind(this);
        this.getEndPos = this.getEndPos.bind(this);
    }

    getStartPos(dayStartHour, hoursInDay) {
        // Returns the percentage from the top of the containing element the top of the event element should be
        let eventStartHour = this.start.hour();
        return (eventStartHour - dayStartHour) / hoursInDay * 100 + "%";
    }

    getEndPos(dayEndHour, hoursInDay) {
        // Returns the percentage from the bottom of the containing element the bottom of the event element should be
        let eventEndHour = this.end.hour();
        return (dayEndHour - eventEndHour) / hoursInDay * 100 + "%";
    }


}