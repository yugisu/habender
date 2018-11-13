import React from 'react';

import './CalendarTile.css';

const CalendarTile = ({ dayObj, activities, isFromOtherMonth }) => {
  return (
    <div className="tile">
      <div className={`day-label ${isFromOtherMonth && 'other-month'}`}>
        {dayObj.date}
      </div>
      <ul className="day">
        {activities.map((el) => (
          <li className="todo minified" key={`todo-${el.id}`}>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarTile;
