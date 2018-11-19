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
        'Make some damn good coffee for D.',
      ]),
      Calendar.newDay(NiceDate.newDate(this.today, -33), [
        'Drink some cola',
        'Finish that goddamn stoopid todo app',
      ]),
    ],
  };

  onMonthChange = (command) => {
    const amount = command === 'prev' ? -1 : 1;
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

        <div className="calendar__body">
          <Month monthObj={openedMonth} todos={curMonthTodos} />
        </div>
      </div>
    );
  }
}

export default Calendar;
