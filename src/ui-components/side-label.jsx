import React, {Component} from 'react';

export default class SideLabel extends React.Component{

    constructor(props) {
        super(props);


    }

    render() {
        let timeSections = [];
        let startHour = this.props.startHour;
        let endHour = this.props.endHour;
        let range = endHour - startHour;
        for (let i = 0; i < range; ++i) {
            let hour = startHour + i;
            let displayHour = (hour > 12) ? hour-12 : hour;
            let label = displayHour + ((hour < 12) ? ' AM' : ' PM');
            timeSections.push(<div className="urc-side-label" key={i}>{label}</div>)
        }
        return (
            <div className="urc-side-labels-container">
                {timeSections}
            </div>
        )
    }

}