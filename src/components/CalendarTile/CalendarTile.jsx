import React, { Component } from 'react';

import Todo from '../Todo';
import TodoForm from '../TodoForm';

class CalendarTile extends Component {
  shouldComponentUpdate() {
    return false;
  }

  withForceUpdate = (func) => (...args) => {
    func(...args);
    this.forceUpdate();
    // TODO: Deal with this.forcUpdate() -- a bad practice (or not?)
  };

  render() {
    const {
      dayObj,
      activities,
      isFromOtherMonth,
      onTodoChange,
      onNewTodo,
    } = this.props;

    const isEmpty = activities.length === 0;

    const isHidden = true;

    const todos = activities.map((todo) => (
      <Todo
        todoObj={todo}
        key={`todo-${todo.id}`}
        onTodoChange={this.withForceUpdate(onTodoChange)}
      />
    ));

    return (
      <div
        className={
          'tile' +
          (isFromOtherMonth ? ' tile--other-month' : '') +
          (!isEmpty ? ' tile--not-empty' : '')
        }
      >
        {/* TODO: Standardize buttons */}

        <TodoForm onNewTodo={this.withForceUpdate(onNewTodo)} dayObj={dayObj} />

        <div
          className={
            'tile__content' + (isHidden ? ' tile__content--hidden' : '')
          }
        >
          {todos}
        </div>

        <div className="tile__label">
          <div className="tile__label__name">{dayObj.date}</div>
        </div>
      </div>
    );
  }
}

export default CalendarTile;
