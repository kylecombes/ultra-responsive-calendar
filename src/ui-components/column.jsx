import * as React from 'react';

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

    render() {

        let events = [];

        let hoursInDay = this.props.dayEndHour - this.props.dayStartHour;

        for (let i = 0; i < this.props.events.length; ++i) {
            let event = this.props.events[i];
            let startPos = event.getStartPos(this.props.dayStartHour, hoursInDay);
            let endPos = event.getEndPos(this.props.dayEndHour, hoursInDay);
            let style = {top: startPos, bottom: endPos};
            let eventElem = <div className="urc-event" key={i} style={style} >{event.name}</div>;
            events.push(eventElem);
        }

        return (
            <div id={this.props.id} className={this.state.classes.join(' ')}>
                {events}
            </div>
        )
    }

}