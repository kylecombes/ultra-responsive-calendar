"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import moment from 'moment';

var CalendarEvent = function () {
    function CalendarEvent(id, name, start, end, view_url, edit_url) {
        _classCallCheck(this, CalendarEvent);

        this.id = id;
        this.name = name;
        this.start = start;
        this.end = end;
        this.view_url = view_url;
        this.edit_url = edit_url;

        this.getStartPos = this.getStartPos.bind(this);
        this.getEndPos = this.getEndPos.bind(this);
    }

    _createClass(CalendarEvent, [{
        key: "getStartPos",
        value: function getStartPos(dayStartHour, hoursInDay) {
            // Returns the percentage from the top of the containing element the top of the event element should be
            var eventStartHour = this.start.hour();
            return (eventStartHour - dayStartHour) / hoursInDay * 100 + "%";
        }
    }, {
        key: "getEndPos",
        value: function getEndPos(dayEndHour, hoursInDay) {
            // Returns the percentage from the bottom of the containing element the bottom of the event element should be
            var eventEndHour = this.end.hour();
            return (dayEndHour - eventEndHour) / hoursInDay * 100 + "%";
        }
    }]);

    return CalendarEvent;
}();

exports.default = CalendarEvent;