import React, { Component } from 'react';
import Activity from '../Activity/';

class DateCard extends Component {
  render() {
    const {
      onNewActivity,
      onActivityInput,
      onDeleteActivity,
      cardNumber,
      cardName,
      activities,
      dateObj,
    } = this.props;

    return (
      <div className={`date-card ${'Card' + cardNumber}`}>
        <div className="card-header">
          <button
            className="new-activity"
            title="New activity"
            onClick={() => onNewActivity(dateObj)}
          >
            +
          </button>
          <span>{cardName}</span>
        </div>

        <div className="card-content">
          <ul className="activities">
            {activities.map((activity, idx) => (
              <Activity
                key={`${cardName}-${idx}`}
                date={dateObj.show()}
                activity={activity}
                onActivityInput={onActivityInput}
                onDeleteActivity={onDeleteActivity}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DateCard;
