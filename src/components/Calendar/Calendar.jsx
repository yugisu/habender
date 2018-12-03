import React, { Component } from 'react';
import CalendarDays from '../CalendarDays';
import CalendarWeek from '../CalendarWeek';

// TODO: borrow Calendar component from tile-ui

class Calendar extends Component {
  render() {
    const firstDayOfMonth = new Date(
      `01.${this.props.dateObj.monthName}.${this.props.dateObj.year}`
    );

    const calendarDateObjects = [
      ...Array(5).fill([...Array(7).keys()].map((elem) => elem + 1)),
    ].map((week, idxW) =>
      week.map((day) => {
        const tetha = new Date(
          `01.${this.props.dateObj.monthName}.${this.props.dateObj.year}`
        );
        tetha.setDate(
          tetha.getDate() + (day - firstDayOfMonth.getDay()) + 7 * idxW
        );

        return tetha;
      })
    );

    return (
      <div className="date-card Calendar">
        <div className="card-header">
          <button className="change-month prev-month" title="Previous month">
            {' '}
            <img
              alt=""
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgogIDxnPgogICAgPHBhdGggZD0ibTQwLjQsMTIxLjNjLTAuOCwwLjgtMS44LDEuMi0yLjksMS4ycy0yLjEtMC40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjgsMGw1My45LDUzLjljMS42LDEuNiAxLjYsNC4yIDAsNS44bC01My45LDUzLjl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgo8L3N2Zz4K"
            />
          </button>

          <span>
            {`${this.props.dateObj.monthName}, ${this.props.dateObj.year}`}
          </span>

          <button className="change-month next-month" title="Next month">
            {' '}
            <img
              alt=""
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgogIDxnPgogICAgPHBhdGggZD0ibTQwLjQsMTIxLjNjLTAuOCwwLjgtMS44LDEuMi0yLjksMS4ycy0yLjEtMC40LTIuOS0xLjJjLTEuNi0xLjYtMS42LTQuMiAwLTUuOGw1MS01MS01MS01MWMtMS42LTEuNi0xLjYtNC4yIDAtNS44IDEuNi0xLjYgNC4yLTEuNiA1LjgsMGw1My45LDUzLjljMS42LDEuNiAxLjYsNC4yIDAsNS44bC01My45LDUzLjl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgo8L3N2Zz4K"
            />
          </button>
        </div>

        <div className="card-content">
          <CalendarDays />

          {calendarDateObjects.map((week, idxW) => (
            <CalendarWeek
              key={idxW + 1}
              weekNumber={idxW + 1}
              week={week}
              today={this.props.dateObj}
              activities={this.props.activities}
              openedCard={this.props.openedCard}
              onTileClick={this.props.onTileClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Calendar;
