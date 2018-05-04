import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class MultiDayHeader extends React.Component {

  render() {
    const titles = [];
    const day = moment(this.props.startingDay);

    for (let i = 0; i < this.props.days; ++i) {
      titles.push(<span key={i}>{day.format(this.props.format)}</span>);
      day.add(1, 'd');
    }

    const styles = {
      marginLeft: this.props.marginLeft,
    };

    return (
      <div className="multi-day-header" style={styles}>
        {titles}
      </div>
    )
  }

}

MultiDayHeader.propTypes = {
  days: PropTypes.number,
  startingDay: PropTypes.instanceOf(moment),
  format: PropTypes.string,
  marginLeft: PropTypes.string,
};

MultiDayHeader.defaultProps = {
  days: 7,
  startingDay: moment(),
  format: 'ddd',
  marginLeft: '0',
};
