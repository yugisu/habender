import React, { Component } from 'react';
import NiceDate from '../../NiceDate';

import Month from '../Month';
import CalendarHead from '../CalendarHead';

const giveId = (function idGenerator() {
  let counter = 1;
  return () => counter++;
})();

class Calendar extends Component {
  today = new NiceDate();

  state = {
    openedMonth: new NiceDate(`${this.today.month}.1.${this.today.year}`),
    todos: [
      Calendar.newDay(this.today, [
        'Feed a cat',
        'Cook some dinner',
        'Make some tea for my darling ♥',
      ]),
      Calendar.newDay(NiceDate.newDate(this.today, -22), [
        'Drink some cola',
        'Finish that goddamn stoopid todo app',
      ]),
    ],
  };

  findTodo = (id, stateObj = this.state) => {
    const todos = stateObj.todos;
    for (const date of todos) {
      for (const todo of date) {
        if (todo.id === id) {
          return todo;
        }
      }
    }
    return null;
  };

  onMonthChange = (command) => {
    const amount = command === 'prev' ? -1 : 1;
    this.setState((state) => ({
      openedMonth: NiceDate.newDate(state.openedMonth, 0, amount),
    }));
  };

  applyChangeInTodo = (todoId, changes) => {
    this.setState((state) => {
      const todos = state.todos;
      for (const date of todos) {
        for (const todo of date.activities) {
          if (todo.id === todoId) {
            Object.assign(todo, changes);
          }
        }
      }
      return state;
    });
  };

  static newActivity = (name = 'New TODO', desc = 'A todo desc') => ({
    id: giveId(),
    done: false,
    name: name,
    desc: desc,
  });

  static newDay = (date, activities = []) => ({
    date,
    activities: activities.map((el) => Calendar.newActivity(el)),
  });

  render() {
    const { openedMonth, todos } = this.state;

    // const prevMonthTodos = todos.filter((el) => el.date.month === openedMonth.month - 1);
    const currentTodos = todos.filter((el) =>
      [
        openedMonth.month - 1,
        openedMonth.month,
        openedMonth.month + 1,
      ].includes(el.date.month)
    );
    // const nextMonthTodos = todos.filter((el) => el.date.month === openedMonth.month + 1);

    return (
      <div className="calendar">
        <CalendarHead
          label={`${openedMonth.monthName}, ${openedMonth.year}`}
          onMonthChange={this.onMonthChange}
        />

        <div className="calendar__body">
          <Month
            monthObj={openedMonth}
            todos={currentTodos}
            onTodoChange={this.applyChangeInTodo}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
