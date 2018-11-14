import React from 'react';

const CalendarTile = ({ dayObj, activities, isFromOtherMonth }) => {
  return (
    <div className={`tile ${isFromOtherMonth && 'other-month'}`}>
      <div className="day-label">{dayObj.date}</div>
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
