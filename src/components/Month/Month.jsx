import React from 'react';

import { NiceDate } from '../../helpers';
import CalendarTile from '../CalendarTile';

const Month = ({ monthObj, todos, ...todoEvents }) => {
  const monthTiles = [
    ...Array(6).fill([...Array(7).keys()].map((elem) => elem + 1)),
  ].map((week, idxW) =>
    week.map((day) => {
      const tetha = NiceDate.newDate(monthObj, day - monthObj.day + 7 * idxW);
      const dayInTodos = todos.find((el) => el.date.show() === tetha.show());
      return (
        <CalendarTile
          dayObj={tetha}
          activities={dayInTodos ? dayInTodos.activities : []}
          isFromOtherMonth={tetha.month !== monthObj.month}
          key={`tile-${tetha.show()}`}
          {...todoEvents}
        />
      );
    })
  );

  return <div className="month">{monthTiles}</div>;
};

export default Month;
