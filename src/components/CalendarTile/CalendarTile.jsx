import React, { Component } from 'react';

import Todo from '../Todo';
import TodoForm from '../TodoForm';

class CalendarTile extends Component {
  withForceUpdate = (func) => (...args) => {
    func(...args);

    // TODO: Deal with this.forceUpdate -- a bad practice

    this.forceUpdate();
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
          className={`tile__content ${isHidden ? 'tile__content--hidden' : ''}`}
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
