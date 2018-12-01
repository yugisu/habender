import React, { Component } from 'react';
import Calendar from "./Calendar"; 
import DateCard from './DateCard';

import OptDate from './OptDate';

// const {whyDidYouUpdate} = require('../../node_modules/why-did-you-update')
// whyDidYouUpdate(React)

const MAX_ID = 1000;

const giveId = idGiver(MAX_ID);

function idGiver(max) {
  const MAX_ID = max;
  const genny = (function*() {
    let id = 0;
    while (id <= MAX_ID) { yield id++; }
  })();

  return function() { 
    const gennyRes = genny.next();
    return (gennyRes.done) ? null : gennyRes.value;
  }
}

//TODO: MAKE PAGE LOOK GOOD
//TODO: GOOD LOOKING == USUAL PLANNER PAGE > INTERACTIVE TILES (U CLICK - IT EXPANDS)

//TODO: Make <Activity /> suitable for use with <CalendarTile />

//DONE: GET RID OF THAT PERFOMANCE TROUBLES - DONE

class Main extends Component {
  constructor(props) {
    super(props);

    const today = new OptDate();
    const tomorrow = new OptDate({daysAhead: 1});

    this.MAX_ID = 1000;

    this.state = {
      today: today,
      tomorrow: tomorrow,

      currentCards: [
        {
          name: "Today: " + today.getDateForComparison(), 
          date: today,
        }, 
        {
          name: tomorrow.getDateForComparison(),
          date: tomorrow,
        },
      ],

      planner: [
        {
          date: today.getDateForComparison(),
          activities: [
            {
              id: giveId(),
              done: true,
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
          date: tomorrow.getDateForComparison(),
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
        },
      ],
    }

    this.onNewActivity = this.onNewActivity.bind(this);
    this.handleInputInActivity = this.handleInputInActivity.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.changeOpenedCard = this.changeOpenedCard.bind(this);
  }

  findDate (givenDate, stateObj=this.state) {

    // Date should be an OptDate object
    let date = givenDate;
    if (givenDate instanceof Date) { 
      date = new OptDate({}, givenDate);
    } else if (typeof givenDate === 'string') {
      date = new OptDate({}, new Date(givenDate));
    }

    // Finds the day by date
    for (const day of stateObj.planner) {
      if (date.getDateForComparison() === day.date) {
        return day;
      }
    }

    // If no such date found, returns null 
    // (I know, that's undefined is by default, but still)
    return null;
  }

  handleInputInActivity (obj) {
    this.setState((state, props) => {
      let newState = Object.assign({}, state);

      for (const elem1 of newState.planner) {
        if (obj.date === elem1.date) { 
          for (const elem2 of elem1.activities) {
            if (obj.id === elem2.id) {
              let val = obj.value;
              // eslint-disable-next-line
              if (val === 'true' || val === 'false') { val = val == 'true' }
              elem2[obj.key] = val;
              break;
            }
          }
          break;
        }
      }
      return newState;
    })
  }

  onNewActivity (dateObj) {

    const newAct = {
      id: giveId(),
      done: false,
      time: "",
      name: "",
      description: "",
    }

    this.setState((state, props) => {
      const newState = Object.assign({}, state);
      
      const date = this.findDate(dateObj, newState);
      if (date) {
        date.activities.unshift(newAct);
      } else {
        newState.planner.push({
          date: dateObj.getDateForComparison(),
          activities: [newAct],
        })
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

  }

  changeOpenedCard (obj) {
    this.setState((state, props) => {
      state.currentCards[1] = obj;
      return state;
    })
  }

  deleteActivity (id) {
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
    })
  }

  render() {
    
    return (
      <main>
        {this.state.currentCards.map((elem, idx) => {
          const dateFromState = (this.findDate(elem.date));
          
          const activs = (dateFromState) ? 
            dateFromState.activities : [];

          return (
            <DateCard 
              key={'Card' + (idx+1)}
              cardName={elem.name}
              cardNumber={idx + 1}
              dateObj={elem.date}
              activities={activs}
              onNewActivity={this.onNewActivity}
              applyChange={this.handleInputInActivity}
              deleteActivity={this.deleteActivity}
            />

          )
        })}

        <Calendar
          dateObj={this.state.today} // ????
          activities={this.state.planner}
          openedCard={this.state.currentCards[1]}
          handleClickOnTile={this.changeOpenedCard}
        />

    </main>
    );
  }
}

export default Main;