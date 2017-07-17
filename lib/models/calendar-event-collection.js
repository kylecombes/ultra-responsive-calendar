'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calendarEventCollection = require('./calendar-event-collection.jsx');

var _calendarEventCollection2 = _interopRequireDefault(_calendarEventCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventCollection = function () {
    function EventCollection(events) {
        _classCallCheck(this, EventCollection);

        this.events = events ? events : [];
    }

    _createClass(EventCollection, [{
        key: 'addEvent',
        value: function addEvent(event) {
            this.events.push(event);
        }
    }, {
        key: 'getEventsOnDate',
        value: function getEventsOnDate(date) {

            var matchingEvents = [];
            for (var i = 0; i < this.events.length; ++i) {
                var event = this.events[i];
                if (event.start.dayOfYear() === date.dayOfYear() && event.start.year() === date.year()) matchingEvents.push(event);
            }
            return matchingEvents;
        }
    }]);

    return EventCollection;
}();

exports.default = EventCollection;