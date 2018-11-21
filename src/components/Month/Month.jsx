import React from 'react';

import NiceDate from '../../NiceDate';
import CalendarTile from '../CalendarTile';

const Month = ({ monthObj, todos }) => {
  const monthTiles = [
    ...Array(6).fill([...Array(7).keys()].map((elem) => elem + 1)),
  ].map((week, idxW) =>
    week.map((day, idxD) => {
      const tetha = NiceDate.newDate(monthObj);
      tetha.addDays(day - monthObj.day + 7 * idxW);

      const isFromOtherMonth = tetha.month !== monthObj.month;
      const dayInTodos = todos.find(
        (el) => !isFromOtherMonth && el.date.date === tetha.date,
      );
      let activities = [];
      if (dayInTodos) {
        activities = dayInTodos.activities;
      }
      return (
        <CalendarTile
          dayObj={tetha}
          activities={activities}
          isFromOtherMonth={isFromOtherMonth}
          key={tetha.show()}
        />
      );
    }),
  );

  return <div className="month">{monthTiles}</div>;
};

export default Month;
