import React from 'react';

import './CalendarHead.css';

const CalendarHead = ({ label, onMonthChange }) => {
  return (
    <div className="calendar-head">
      <span>{label}</span>
      <div>
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
