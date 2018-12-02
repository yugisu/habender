import React, { Component } from 'react';
import CalendarTile from '../CalendarTile';
import NiceDate from '../NiceDate';

class CalendarWeek extends Component {
  constructor(props) {
    super(props);

    this.handleClickOnTile = this.handleClickOnTile.bind(this);
  }

  handleClickOnTile(dateStr) {
    const optDateFromDateStr = new NiceDate({}, new Date(dateStr));

    this.props.handleClickOnTile({
      date: optDateFromDateStr,
      name: optDateFromDateStr.getDateForComparison(),
    });
  }

  render() {
    const activities = this.props.activities;
    let isCurrentWeek;

    return (
      <div className="calendar-week">
        {this.props.week.map((day, idxD) => {
          let currentActivities = [];

          const isToday =
            this.props.today.getDateForComparison() ===
            new NiceDate({}, day).getDateForComparison();
          const isInCard =
            this.props.openedCard.name ===
            new NiceDate({}, day).getDateForComparison();

          for (let dayB of activities) {
            if (dayB.date === new NiceDate({}, day).getDateForComparison()) {
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
          );
        })}
      </div>
    );
  }
}

export default CalendarWeek;
