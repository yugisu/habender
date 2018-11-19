import React from 'react';

const CalendarTile = ({ dayObj, activities, isFromOtherMonth }) => {
  const isEmpty = activities.length === 0;
  const tileClasses = [
    'tile',
    !isFromOtherMonth || ' tile--other-month',
    isEmpty ? '' : ' tile--not-empty',
  ];
  return (
    <div
      className={
        'tile' +
        (isFromOtherMonth ? ' tile--other-month' : '') +
        (!isEmpty ? ' tile--not-empty' : '')
      }
    >
      <div className="tile__label">
        <span>{dayObj.date}</span>
      </div>
      <ul className="tile__content">
        {activities.map((el) => (
          <li className="todo todo--minified" key={`todo-${el.id}`}>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarTile;
