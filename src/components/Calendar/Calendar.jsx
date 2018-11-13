import React, { Component } from 'react';
import NiceDate from '../../NiceDate';

import './Calendar.css';
import Month from '../Month';
import CalendarHead from '../CalendarHead';

const giveId = (function idGenerator() {
  let counter = 1;
  return () => counter++;
})();

// OLD TODOS
/* const todos = [
  {
    date: this.today,
    activities: [
      {
        id: giveId(),
        done: false,
        time: "17:00",
        name: "Feed a cat",
        description: "Give this fat bastard some tuna <3",
      },
      {
        id: giveId(),
        done: false,
        time: "19:00",
        name: "Cook some dinner",
        description: "Coke + cereal - what could be more tasty?"
      },
      {
        id: giveId(),
        done: false,
        time: "19:00",
        name: "Make some damn good coffee for D.",
        description: "Don't forget about cinnamon",
      }
    ]
  },
  {
    date: this.today.addDays(1),
    activities: [
      {
        id: giveId(),
        done: false,
        time: "12:00",
        name: "Feed a cat",
        description: "Feed this fat bastard with some tuna <3",
      },
      {
        id: giveId(),
        done: false,
        time: "17:00",
        name: "Cook some dinner",
        description: "Healthy food, huh?"
      },
      {
        id: giveId(),
        done: false,
        time: "19:00",
        name: "Make a cup of tea for D.",
        description: "Cup should be big!",
      }
    ]
  }
] */

class Calendar extends Component {
  today = new NiceDate();

  state = {
    openedMonth: new NiceDate(`${this.today.month}.1.${this.today.year}`),
    todos: [
      Calendar.newDay(this.today, [
        'Feed a cat',
        'Cook some dinner',
        'Make some damn good coffee for D.',
      ]),
      Calendar.newDay(NiceDate.newDate(this.today, -33), [
        'Drink some cola',
        'Finish that goddamn stoopid todo app',
      ]),
    ],
  };

  onMonthChange = (amount) => {
    this.setState((state) => ({
      openedMonth: NiceDate.newDate(state.openedMonth, 0, amount),
    }));
  };

  static newActivity = (name = 'New TODO') => ({
    id: giveId(),
    done: false,
    name: name,
  });

  static newDay = (date, activities = []) => ({
    date,
    activities: activities.map((el) => Calendar.newActivity(el)),
  });

  render() {
    const { openedMonth, todos } = this.state;

    // const prevMonthTodos = todos.filter((el) => el.date.month === openedMonth.month - 1);
    const curMonthTodos = todos.filter(
      (el) => el.date.month === openedMonth.month,
    );
    // const nextMonthTodos = todos.filter((el) => el.date.month === openedMonth.month + 1);

    return (
      <div className="calendar">
        <CalendarHead
          label={`${openedMonth.monthName}, ${openedMonth.year}`}
          onMonthChange={this.onMonthChange}
        />

        <div className="calendar-body">
          <Month monthObj={openedMonth} todos={curMonthTodos} />
        </div>
      </div>
    );
  }
}

export default Calendar;
