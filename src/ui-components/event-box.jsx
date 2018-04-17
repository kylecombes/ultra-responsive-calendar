import React, { Component } from 'react';

export default class EventBox extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(clickEvent) {
        if (this.props.onClick) {
            this.props.onClick(this.props.event, clickEvent);
            clickEvent.preventDefault();
        }
    }

    render() {
        let event = this.props.event;
        let viewElement = (event.view_url)
                ? <a href={event.view_url} title="View details" alt="View event details"><span className="urc-event-view">Details</span></a>
                : null;
        let editElement = (event.edit_url)
                ? <a href={event.edit_url} title="Edit event" alt="Edit event details"><span className="urc-event-view">Edit</span></a>
                : null;
        const classes = "urc-event" + (this.props.className ? ' ' + this.props.className : '');
        const styles = event.color ? Object.assign({}, this.props.styles, { backgroundColor: event.color }) : this.props.styles;
        const timeLocation = this.props.showDetails ? (
            <div className="urc-event-time-location-container">
                <div className="urc-event-time">
                    <span className="urc-event-time-start">{event.start.format('h:mma')}</span>
                    <span className="urc-event-time-to"> - </span>
                    <span className="urc-event-time-end">{event.end.format('h:mma')}</span>
                </div>
                {/*<span className="urc-event-location">{event.location}</span>*/}
            </div>
        ) : null;
        return (
            <div className={classes} style={styles} onClick={this.onClick} >
                <div className="urc-event-contents">
                    <span className="urc-event-title">{event.title}</span>
                    {timeLocation}
                    <div className="urc-event-options-container">
                        {viewElement}
                        {editElement}
                    </div>
                </div>
            </div>
        )
    }


}