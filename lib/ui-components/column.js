'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _eventBox = require('./event-box.jsx');

var _eventBox2 = _interopRequireDefault(_eventBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalendarColumn = function (_React$Component) {
    _inherits(CalendarColumn, _React$Component);

    function CalendarColumn(props) {
        _classCallCheck(this, CalendarColumn);

        var _this = _possibleConstructorReturn(this, (CalendarColumn.__proto__ || Object.getPrototypeOf(CalendarColumn)).call(this, props));

        _this.state = { classes: _this.getClasses(props) };
        return _this;
    }

    _createClass(CalendarColumn, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ classes: this.getClasses(nextProps) });
        }
    }, {
        key: 'getClasses',
        value: function getClasses(props) {
            var classes = ['urc-column'];
            if (props) {
                classes.push('col-num-' + props.columnNumber);
                Object.assign(classes, props.classes);
            }
            return classes;
        }
    }, {
        key: 'render',
        value: function render() {

            var events = [];

            var hoursInDay = this.props.dayEndHour - this.props.dayStartHour;

            for (var i = 0; i < this.props.events.length; ++i) {
                var event = this.props.events[i];
                var startPos = event.getStartPos(this.props.dayStartHour, hoursInDay);
                var endPos = event.getEndPos(this.props.dayEndHour, hoursInDay);
                var styles = { top: startPos, bottom: endPos };
                events.push(React.createElement(_eventBox2.default, { event: event, styles: styles, key: i }));
            }

            return React.createElement(
                'div',
                { id: this.props.id, className: this.state.classes.join(' ') },
                events
            );
        }
    }]);

    return CalendarColumn;
}(React.Component);

exports.default = CalendarColumn;