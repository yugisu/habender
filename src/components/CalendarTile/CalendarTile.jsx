import React from 'react';

import './CalendarTile.css';

const CalendarTile = ({ dayObj, activities, isFromOtherMonth }) => {
  return (
    <div className={`day ${isFromOtherMonth === true ? 'other-month' : ''}`}>
      <div className="day-head">{dayObj.date}</div>
      <ul className="day-body">
        {activities.map((el) => (
          <li className="todo minified" key={`todo-${el.id}`}>
            {' '}
            {el.name}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarTile;
