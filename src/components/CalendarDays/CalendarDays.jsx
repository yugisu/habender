import React from 'react';

// TODO: bind these days to real days in calendar i.e. make defined style for week days
const CalendarDays = () => {
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return (
    <div className="calendar-days">
      {weekDays.map((day) => (
        <div key={`day-${day.slice(0, 3)}`}>{day.slice(0, 3)}</div>
      ))}
    </div>
  );
};

export default CalendarDays;
