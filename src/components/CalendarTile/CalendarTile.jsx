import React, { Component } from 'react';
import NiceDate from '../../NiceDate';

// TODO: borrow tile from tile-ui, rework that

class CalendarTile extends Component {
  shouldComponentUpdate(props) {
    //TODO: DO SOMETHING WITH AUTOUPDATING

    // this.props.currentActivities IS UPDATING ON EMPTY TILES

    return (
      this.props.currentActivities === props.currentActivities ||
      this.props.isInCard !== props.isInCard ||
      this.props.isToday !== props.isToday
    );
  }

  render() {
    const {
      dateObj,
      dayNumber,
      weekNumber,
      isInCard,
      isToday,
      currentActivities,
      onTileClick,
    } = this.props;
    const date = new NiceDate(this.props.dateObj);

    return (
      <div
        className={'calendar-tile'}
        id={weekNumber + '_' + dayNumber}
        onClick={() => onTileClick(new NiceDate(dateObj))}
      >
        <div
          className={`tile-header ${isToday ? 'today-tile' : ''} ${
            isInCard ? 'opened-tile' : ''
          }`}
        >
          <span>{date.date}</span>
          <span />
        </div>
        <ul className="activities">
          {(currentActivities ? currentActivities : []).map((elem, idx) => {
            return (
              <li className={elem.done ? 'done' : 'not-done'} key={idx + 1}>
                <div className="activity-time">
                  {elem.time ? elem.time : 'never'}
                </div>
                <div className="activity-name">
                  {elem.name ? elem.name : 'New act'}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CalendarTile;
