import React from 'react';

const CalendarHead = ({ label, onMonthChange }) => {
  return (
    <div className="calendar-head">
      <span>{label}</span>
      <div className="calendar-head-btns">
        {['prev', 'next'].map((el, idx) => {
          return (
            <button
              onClick={() => onMonthChange(idx * 2 - 1)}
              key={`btn-${el}`}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHead;
