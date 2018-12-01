import React, { Component } from 'react';
import CalendarTile from './CalendarTile';
import OptDate from './OptDate';

class CalendarWeek extends Component {
  constructor(props) {
    super(props);

    this.handleClickOnTile = this.handleClickOnTile.bind(this);
  }

  handleClickOnTile(dateStr) {
    const optDateFromDateStr = new OptDate({}, new Date(dateStr));

      this.props.handleClickOnTile({
        date: optDateFromDateStr,
        name: optDateFromDateStr.getDateForComparison(),
      })
  }

  render() {
    const activities = this.props.activities;
    let isCurrentWeek

    return (
      <div className="calendar-week">
        {this.props.week.map((day, idxD) => {
          let currentActivities = [];

          const isToday = (this.props.today.getDateForComparison() === (new OptDate({}, day)).getDateForComparison());
          const isInCard = (this.props.openedCard.name === (new OptDate({}, day).getDateForComparison()));

          for (let dayB of activities) {
            if (dayB.date === (new OptDate({}, day)).getDateForComparison()) {
              currentActivities = dayB.activities;
            }
          }

          return (
            <CalendarTile 
              dateObj={day}
              key={idxD + 1}
              dayNumber={idxD + 1}
              weekNumber={this.props.weekNumber}
              currentActivities={currentActivities}
              handleClick={this.handleClickOnTile}

              isToday={isToday}
              isInCard={isInCard}
            />
          )
        })}
      </div>
    );
  }
}

export default CalendarWeek;