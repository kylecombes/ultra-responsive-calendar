import React, { Component } from 'react';

export default class EventBox extends Component {

    onClick = (clickEvent) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.event, clickEvent);
            clickEvent.preventDefault();
        }
    };

    render() {
        let event = this.props.event;
        const classes = "urc-event" + (this.props.className ? ' ' + this.props.className : '');
        const styles = event.color
            ? Object.assign({}, this.props.styles, { backgroundColor: event.color })
            : this.props.styles;
        return (
            <div className={classes} style={styles} onClick={this.onClick} >
                <span className="urc-event-title">{event.title}</span>
            </div>
        )
    }


}