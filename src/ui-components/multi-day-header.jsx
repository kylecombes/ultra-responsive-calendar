import React from 'react';

export default class MultiDayHeader extends React.Component {

    render() {
        const numDays = this.props.numDays || 7;

        const startingDay = this.props.startingDay || moment();

        const titles = [];

        for (let i = 0; i < numDays; ++i) {
            titles.push(<span key={i}>{startingDay.format('ddd')}</span>);
            startingDay.add(1, 'd');
        }

        return (
            <div className="urc-multi-day-header">
                {titles}
            </div>
        )
    }

}