import React, { Component } from 'react';
import Calendar from '../Calendar';
import DateCard from '../DateCard';

import NiceDate from '../NiceDate';

// const {whyDidYouUpdate} = require('../../node_modules/why-did-you-update')
// whyDidYouUpdate(React)

const giveId = ((count = 0) => () => count++)();

//TODO: MAKE PAGE LOOK GOOD
//TODO: GOOD LOOKING == USUAL PLANNER PAGE > INTERACTIVE TILES (U CLICK - IT EXPANDS)

//TODO: Make <Activity /> suitable for use with <CalendarTile />

//DONE: GET RID OF THAT PERFOMANCE TROUBLES - DONE

class Main extends Component {
  today = new NiceDate();
  tomorrow = new NiceDate({ daysAhead: 1 });

  state = {
    today: this.today,

    // TODO: think about usage of 'this.today' in cards, get rid of 'tomorrow' state
    currentCards: [
      {
        name: 'Today: ' + this.today.getDateForComparison(),
        date: this.today,
      },
      {
        name: this.tomorrow.getDateForComparison(),
        date: this.tomorrow,
      },
    ],

    //TODO: take planner & NiceDate from new-ui version
    planner: [
      {
        date: this.today.getDateForComparison(),
        activities: [
          {
            id: giveId(),
            done: false,
            time: '17:00',
            name: 'Feed a cat',
            description: 'Give this fat bastard some tuna <3',
          },
          {
            id: giveId(),
            done: true,
            time: '19:00',
            name: 'Cook some dinner',
            description: 'Coke + cereal - what could be more tasty?',
          },
          {
            id: giveId(),
            done: false,
            time: '19:00',
            name: 'Make some damn good coffee for D.',
            description: 'Don\'t forget about cinnamon',
          },
        ],
      },
      {
        date: this.tomorrow.getDateForComparison(),
        activities: [
          {
            id: giveId(),
            done: false,
            time: '12:00',
            name: 'Feed a cat',
            description: 'Feed this fat bastard with some tuna <3',
          },
          {
            id: giveId(),
            done: false,
            time: '17:00',
            name: 'Cook some dinner',
            description: 'Healthy food, huh?',
          },
          {
            id: giveId(),
            done: false,
            time: '19:00',
            name: 'Make a cup of tea for D.',
            description: 'Cup should be big!',
          },
        ],
      },
    ],
  };

  _findDate = (givenDate, stateObj = this.state) => {
    // Date should be an NiceDate object
    let date = givenDate;
    if (givenDate instanceof Date) {
      date = new NiceDate({}, givenDate);
    } else if (typeof givenDate === 'string') {
      date = new NiceDate({}, new Date(givenDate));
    }

    for (const day of stateObj.planner) {
      if (date.getDateForComparison() === day.date) {
        return day;
      }
    }
  };

  onActivityInput = (obj) => {
    this.setState((state, props) => {
      let newState = Object.assign({}, state);

      for (const elem1 of newState.planner) {
        if (obj.date === elem1.date) {
          for (const elem2 of elem1.activities) {
            if (obj.id === elem2.id) {
              let val = obj.value;
              // eslint-disable-next-line
              if (val === 'true' || val === 'false') {
                val = val == 'true';
              }
              elem2[obj.key] = val;
              break;
            }
          }
          break;
        }
      }
      return newState;
    });
  };

  onNewActivity = (dateObj) => {
    const newAct = {
      id: giveId(),
      done: false,
      time: '',
      name: '',
      description: '',
    };

    this.setState((state, props) => {
      const newState = Object.assign({}, state);

      const date = this._findDate(dateObj, newState);
      if (date) {
        date.activities.unshift(newAct);
      } else {
        newState.planner.push({
          date: dateObj.getDateForComparison(),
          activities: [newAct],
        });
      }

      return newState;
    });

    // const newActivityId = giveId();

    // this.setState((state, props) => {
    //   const newState = Object.assign({}, state);
    //   obj.newActivity.id = newActivityId;
    //   for (const elem1 of newState.planner) {
    //     if (obj.date === elem1.date) {
    //       elem1.activities.unshift(obj.newActivity);
    //       return newState;
    //     }
    //   }
    //   newState.planner.push({
    //     date: obj.date,
    //     activities: [obj.newActivity,]
    //   });
    //   return newState;
    // })
  };

  changeOpenedCard = (obj) => {
    this.setState((state) => {
      state.currentCards[1] = obj;
      return state;
    });
  };

  deleteActivity = (id) => {
    this.setState((state, props) => {
      const newState = Object.assign({}, state);

      for (const elem1 of newState.planner) {
        for (const elem2 of elem1.activities) {
          // eslint-disable-next-line
          if (elem2.id == id) {
            elem1.activities.splice(elem1.activities.indexOf(elem2), 1);
          }
        }
      }
      return newState;
    });
  };

  render() {
    const { currentCards, today, planner } = this.state;

    const cards = currentCards.map((card, idx) => {
      const dateFromState = this._findDate(card.date);

      return (
        <DateCard
          key={'Card' + (idx + 1)}
          cardName={card.name}
          cardNumber={idx + 1}
          dateObj={card.date}
          activities={dateFromState ? dateFromState.activities : []}
          onNewActivity={this.onNewActivity}
          onActivityInput={this.onActivityInput}
          deleteActivity={this.deleteActivity}
        />
      );
    });

    return (
      <main>
        {cards}

        <Calendar
          dateObj={today} // ????
          activities={planner}
          openedCard={currentCards[1]}
          handleClickOnTile={this.changeOpenedCard}
        />
      </main>
    );
  }
}

export default Main;
