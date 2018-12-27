import React from 'react';

import Todo from '../Todo';

const CalendarTile = ({
  dayObj,
  activities,
  isFromOtherMonth,
  onTodoChange,
}) => {
  const isEmpty = activities.length === 0;

  // TODO: IMPLEMENT HIDDEN CONTENT
  const isHidden = true;

  const todos = activities.map((todo) => (
    <Todo todoObj={todo} key={`todo-${todo.id}`} onTodoChange={onTodoChange} />
  ));

  return (
    <div
      className={
        'tile' +
        (isFromOtherMonth ? ' tile--other-month' : '') +
        (!isEmpty ? ' tile--not-empty' : '')
      }
    >
      <div className="tile__label">
        <div className="tile__label__name">{dayObj.date}</div>
      </div>
      <div
        className={`tile__content ${isHidden ? 'tile__content--hidden' : ''}`}
      >
        {todos}
      </div>
    </div>
  );
};

export default CalendarTile;
