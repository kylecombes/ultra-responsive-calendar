import * as React from "react";

export default class CalendarColumn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        let classes = ['src-column'];
        if (this.props.columnNumber)
            classes.push('col-num-'+this.props.columnNumber);

        this.setState({classes: classes});
    }

    render() {

        let events = [];

        for (let i = 0; i < this.props.events.length; ++i) {
            let event = this.props.events[i];
            events.push(<div className="cal-event">{event.name}</div>);
        }

        return (
            <div id={this.props.id} className={this.state.classes}>
                {events}
            </div>
        )
    }

}