import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class MultiDayHeader extends React.Component {

  render() {
    const titles = [];
    const day = moment(this.props.startingDay);

    for (let i = 0; i < this.props.days; ++i) {
      titles.push(<span key={i}>{day.format('ddd')}</span>);
      day.add(1, 'd');
    }

    return (
      <div className="urc-multi-day-header">
        {titles}
      </div>
    )
  }

}

MultiDayHeader.propTypes = {
  days: PropTypes.number,
  startingDay: PropTypes.instanceOf(moment),
};

MultiDayHeader.defaultProps = {
  days: 7,
  startingDay: moment(),
};
