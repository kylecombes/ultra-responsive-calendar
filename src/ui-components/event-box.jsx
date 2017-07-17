import React, { Component } from 'react';

export default class EventBox extends Component {

    render() {
        let event = this.props.event;
        let viewElement = (event.view_url)
                ? <a href={event.view_url} title="View details" alt="View event details"><span className="urc-event-view">Details</span></a>
                : null;
        let editElement = (event.edit_url)
                ? <a href={event.edit_url} title="Edit event" alt="Edit event details"><span className="urc-event-view">Edit</span></a>
                : null;
        return (
            <div className="urc-event" key={this.props.key} style={this.props.styles} >
                <div className="urc-event-contents">
                    <span className="urc-event-title">{event.name}</span>
                    <div className="urc-event-options-container">
                        {viewElement}
                        {editElement}
                    </div>
                </div>
            </div>
        )
    }


}