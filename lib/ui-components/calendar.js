"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _sideLabel = require("./side-label.jsx");

var _sideLabel2 = _interopRequireDefault(_sideLabel);

var _column = require("./column.jsx");

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarEvent = require("../models/calendar-event.jsx").default;
var EventCollection = require("../models/calendar-event-collection.jsx").default;

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    // This is going to be the most awesome, responsive src EVER!!!

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        var events = [];
        var startOffset = 0;
        for (var i = 0; i < 10; ++i) {
            var _start = (0, _moment2.default)();
            var _end = (0, _moment2.default)();
            _start.add(startOffset, 'h');
            _end.add(startOffset + 1, 'h');
            var event = new CalendarEvent(i, 'Testing ' + i, _start, _end, '/view/' + i, '/edit/' + i);
            events.push(event);
            startOffset += 4;
        }

        var start = (0, _moment2.default)();
        var end = (0, _moment2.default)();
        start.add(1.75, 'h');
        end.add(2.75, 'h');
        events.push(new CalendarEvent(200, 'Offset event', start, end, '/view/200', '/edit/200'));

        _this.state = { eventCollection: new EventCollection(events) };
        return _this;
    }

    _createClass(Calendar, [{
        key: "render",
        value: function render() {

            var columns = [];

            var date = this.props.startDate;

            for (var i = 0; i < this.props.numColumns; ++i) {
                var _events = this.state.eventCollection.getEventsOnDate(date);
                var column = React.createElement(_column2.default, {
                    events: _events,
                    id: 'cal-col-' + i,
                    columnNumber: i,
                    key: i,
                    dayStartHour: this.props.dayStartHour,
                    dayEndHour: this.props.dayEndHour });
                columns.push(column);
                date.add(1, 'd');
            }

            // Get date range to display
            // Get events on each day

            return React.createElement(
                "div",
                { className: "urc-calendar-container" },
                React.createElement(_sideLabel2.default, { startHour: this.props.dayStartHour, endHour: this.props.dayEndHour }),
                React.createElement(
                    "div",
                    { className: "urc-col-container urc-" + this.props.numColumns + "-col" },
                    columns
                )
            );
        }
    }]);

    return Calendar;
}(React.Component);

exports.default = Calendar;