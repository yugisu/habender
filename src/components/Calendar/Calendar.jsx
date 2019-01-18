import React, { Component } from 'react';

import Month from '../Month';
import CalendarHead from '../CalendarHead';
import { AH, NiceDate } from '../../helpers';

const giveId = ((counter = 0) => () => counter++)();

// FIXME: TODOS ON DAYS FROM OTHER MONTH DO NOT RENDER

class Calendar extends Component {
  today = new NiceDate();

  // TODO: reimplement openedMonth logic

  /* 
  'todos' structure: 
  todos: [
    {
      date,
      activities: [
        todo,
        todo, 
        ...
      ]
    }
  ]
  */
  state = {
    openedMonth: new NiceDate(`${this.today.month}.1.${this.today.year}`),
    todos: [
      Calendar.newDay(this.today, [
        'Feed a cat',
        'Cook some dinner',
        'Make some tea for my darling ♥',
      ]),
      Calendar.newDay(NiceDate.newDate(this.today, +15), [
        'Drink some cola',
        'Finish that goddamn stoopid todo app',
      ]),
    ],
  };

  getTodoById = (id, stateObj = this.state) => {
    const { todos } = stateObj;

    for (let i = 0; i < todos.length; i++) {
      const { date, activities } = todos[i];

      for (let j = 0; j < activities.length; j++) {
        const todo = activities[j];

        if (todo.id === id) {
          return { todo, date, idxInTodos: i, idxInActivities: j };
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

  handleChangeInTodo = (todoId, changes) => {
    // TODO: Test performance on both variants

    this.setState(({ todos }) => {
      const { idxInTodos, idxInActivities } = this.getTodoById(todoId);
      const { date, activities } = todos[idxInTodos];

      return {
        todos: AH.replaceElement(todos, idxInTodos, {
          date,
          activities: AH.replaceElement(activities, idxInActivities, {
            ...activities[idxInActivities],
            ...changes,
          }),
        }),
      };

      // return {
      //   todos: todos.map(({ date, activities }) => ({
      //     date,
      //     activities: activities.map(
      //       (todo) => (todo.id === todoId ? { ...todo, ...changes } : todo)
      //     ),
      //   })),
      // };
    });
  };

  handleNewTodo = (dayObj, nameOfTodo) => {
    const { todos } = this.state;
    const dayIdx = todos.findIndex(({ date }) => date.show() === dayObj.show());

    this.setState(({ todos }) => ({
      todos:
        dayIdx !== -1
          ? AH.modifyElement(todos, dayIdx, ({ date, activities }) => ({
            date,
            activities: [Calendar.newActivity(nameOfTodo), ...activities],
          }))
          : [Calendar.newDay(dayObj, [nameOfTodo]), ...todos],
    }));
  };

  handleDeleteTodo = (todoId) => {
    this.setState(({ todos }) => {
      const { idxInTodos, idxInActivities } = this.getTodoById(todoId);
      const { date, activities } = todos[idxInTodos];

      return {
        todos: AH.replaceElement(todos, idxInTodos, {
          date,
          activities: AH.deleteElement(activities, idxInActivities),
        }),
      };
    });
  };

  static newActivity = (name = 'New TODO') => ({
    id: giveId(),
    done: false,
    name,
  });

  static newDay = (date, activities = []) => ({
    date,
    activities: activities.map((el) => Calendar.newActivity(el)),
  });

  render() {
    const { openedMonth, todos } = this.state;

    //FIXME: todos from other months are not properly displayed

    const currentTodos = todos.filter((el) =>
      [openedMonth.month - 1, openedMonth.month, openedMonth.month + 1]
        .map((el) => (el < 0 ? 12 + el : el > 12 ? el - 12 : el))
        .includes(el.date.month)
    );

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
            onTodoChange={this.handleChangeInTodo}
            onNewTodo={this.handleNewTodo}
            onTodoDelete={this.handleDeleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
