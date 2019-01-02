import React, { Component } from 'react';

class CalendarHead extends Component {
  shouldComponentUpdate({ label: newLabel }) {
    return this.props.label !== newLabel;
  }

  render() {
    const { label, onMonthChange } = this.props;
    return (
      <div className="calendar__head">
        <CalendarHeadButton name="prev" {...{ onMonthChange }} />

        <span className="calendar__head__title">{label}</span>

        <CalendarHeadButton name="next" {...{ onMonthChange }} />
      </div>
    );
  }
}

const CalendarHeadButton = ({ name, onMonthChange }) => {
  return (
    <button
      onClick={() => onMonthChange(name)}
      key={`calendar_btn-${name}`}
      className={`calendar__head__button calendar__head__button--${name} btn--round`}
    >
      v
    </button>
  );
};

export default CalendarHead;
