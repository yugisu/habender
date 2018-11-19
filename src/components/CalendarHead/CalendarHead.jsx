import React from 'react';

const CalendarHead = ({ label, onMonthChange }) => {
  return (
    <div className="calendar__head">
      <CalendarHeadButton name="prev" {...{ onMonthChange }} />
      <span className="calendar__head__title">{label}</span>
      <CalendarHeadButton name="next" {...{ onMonthChange }} />
    </div>
  );
};

const CalendarHeadButton = ({ name, onMonthChange }) => {
  return (
    <button
      onClick={() => onMonthChange(name)}
      key={`calendar_btn-${name}`}
      className={`calendar__head__button calendar__head__button--${name}`}
    >
      {name}
    </button>
  );
};

export default CalendarHead;
