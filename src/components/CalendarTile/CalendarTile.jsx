import React from 'react';

import Todo from '../Todo';

const CalendarTile = ({ dayObj, activities, isFromOtherMonth }) => {
  const isEmpty = activities.length === 0;

  return (
    <div
      className={
        'tile' +
        (isFromOtherMonth ? ' tile--other-month' : '') +
        (!isEmpty ? ' tile--not-empty' : '')
      }>
      <div className="tile__label">
        <div className="tile__label__name">{dayObj.date}</div>
      </div>
      <div className="tile__content">
        {activities.map((el) => (
          <Todo todoObj={el} key={`todo-${el.id}`} />
        ))}
      </div>
    </div>
  );
};

export default CalendarTile;
