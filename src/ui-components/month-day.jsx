import React from 'react';

export default class MonthDay extends React.Component {

    render() {
        const className = `urc-month-day ${this.props.className || ''}`;
        return (
            <div className={className}>
                <div className="urc-month-day-header">{this.props.dayOfMonth}</div>
                <div className="urc-month-day-content-container">
                    <div className="urc-month-day-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}