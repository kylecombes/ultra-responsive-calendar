import React from 'react';

export default class MonthDay extends React.Component {

    render() {
        const className = `urc-month-day ${this.props.className || ''}`;
        return (
            <div className={className}>
                <div className="month-day-header">{this.props.dayOfMonth}</div>
                <div className="month-day-container">
                    {this.props.children}
                </div>
            </div>
        )
    }

}