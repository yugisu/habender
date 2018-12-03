import React, { Component } from 'react';
import CalendarTile from '../CalendarTile';
import NiceDate from '../NiceDate';

// TODO: get rid of this shitty component

class CalendarWeek extends Component {
  render() {
    const {
      activities,
      week,
      today,
      openedCard,
      weekNumber,
      onTileClick,
    } = this.props;

    return (
      <div className="calendar-week">
        {week.map((day, idxD) => {
          let currentActivities = [];

          // TODO: rework this peace of shi

          const isToday = today.show() === new NiceDate(day).show();
          const isInCard = openedCard.name === new NiceDate(day).show();

          for (let dayB of activities) {
            if (dayB.date === new NiceDate(day).show()) {
              currentActivities = dayB.activities;
            }
          }

          return (
            <CalendarTile
              dateObj={day}
              key={idxD + 1}
              dayNumber={idxD + 1}
              weekNumber={weekNumber}
              currentActivities={currentActivities}
              onTileClick={onTileClick}
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
