import React from 'react';

import NiceDate from '../../NiceDate';
import CalendarTile from '../CalendarTile';

const Month = ({ monthObj, todos }) => {
  //#region
  const calendarDateObjects = [
    ...Array(6).fill([...Array(7).keys()].map((elem) => elem + 1)),
  ].map((week, idxW) =>
    week.map((day, idxD) => {
      const tetha = NiceDate.newDate(monthObj);
      tetha.addDays(day - monthObj.day + 7 * idxW);
      // tetha.setDate(tetha.getDate() + (day - firstDayOfMonth.getDay()) + 7 * (idxW));

      return tetha;
    }),
  );
  //#endregion

  // console.log(calendarDateObjects);

  //TODO: CAN USE NO calendarDateObjects VARIABLE HERE!

  return (
    <div className="month">
      {calendarDateObjects.map((week, idxW) =>
        week.map((day, idxD) => {
          const isFromOtherMonth = day.month !== monthObj.month;
          const dayInTodos = todos.filter(
            (el) => !isFromOtherMonth && el.date.date === day.date,
          )[0];
          let activities = [];
          if (dayInTodos) {
            activities = dayInTodos.activities;
          }
          return (
            <CalendarTile
              dayObj={day}
              activities={activities}
              isFromOtherMonth={isFromOtherMonth}
              key={day.show()}
            />
          );
        }),
      )}
    </div>
  );
};

export default Month;
