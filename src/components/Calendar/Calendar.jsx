import React, { Component } from 'react';
import NiceDate from '../../NiceDate';

import Month from '../Month';
import CalendarHead from '../CalendarHead';
import { AH, classNames } from '../../helpers';

const giveId = ((counter = 0) => () => counter++)();

// FIXME: TODOS ON DAYS FROM OTHER MONTH DO NOT RENDER

class Calendar extends Component {
  today = new NiceDate();

  // reimplement openedMonth logic

  /* 
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
        'Make some tea for my darling ♥',
      ]),
      Calendar.newDay(NiceDate.newDate(this.today, +22), [
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

  applyChangeInTodo = (todoId, changes) => {
    // TODO: Test performance on both variants

    // const { idxInTodos, idxInActivities } = this.getTodoById(todoId);

    // this.setState(({ todos, ...others }) => {
    //   const { date, activities } = todos[idxInTodos];

    //   return {
    //     ...others,
    //     todos: [
    //       ...todos.slice(0, idxInTodos),
    //       {
    //         date,
    //         activities: [
    //           ...activities.slice(0, idxInActivities),
    //           { ...activities[idxInActivities], ...changes },
    //           ...activities.slice(idxInActivities + 1),
    //         ],
    //       },
    //       ...todos.slice(idxInTodos + 1),
    //     ],
    //   };
    // });

    this.setState(({ todos, ...others }) => ({
      todos: todos.map(({ date, activities }) => ({
        date,
        activities: activities.map(
          (todo) => (todo.id === todoId ? { ...todo, ...changes } : todo)
        ),
      })),
      ...others,
    }));
  };

  onNewTodo = (dayObj, nameOfTodo) => {
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

    // const prevMonthTodos = todos.filter((el) => el.date.month === openedMonth.month - 1);
    const currentTodos = todos.filter(
      (el) => el.date.month === openedMonth.month
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
            onNewTodo={this.onNewTodo}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
