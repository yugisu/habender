import React, { Component } from 'react';

class DateCard extends Component {
  constructor(props) {
    super(props);

    this.cardName = this.props.cardName;
    this.handleNewActivity = this.handleNewActivity.bind(this);
  }

  handleNewActivity(e) {
    this.props.onActivityUpdate({
      date: this.props.date.show(),
      activities: [],
    });
  }

  handleChange(e) {
    const key = classNameToKey(e.target.className);
    const nameOfActivity = this.props.onActivityInput({
      date: this.props.activities.date,
      name: 'aa',
      change: {
        key: key,
        value: e.target.value,
      },
    });
  }

  render() {
    // MAKE PLACEHOLDERS INSTEAD OF THESE VALUES
    let activities =
      this.props.activities.activities.length > 0
        ? this.props.activities.activities
        : [
          {
            done: false,
            time: 'Time',
            name: 'Name of your activity',
            description: 'Describe your activity',
          },
        ];

    return (
      <div id={this.cardName} className="date-card">
        <div className="card-header">
          <button className="new-activity" title="New activity">
            +
          </button>
          <span>{`${this.cardName}: ${this.props.date.month}, ${
            this.props.date.date
          } @${this.props.date.year}`}</span>
        </div>

        <div className="card-content">
          <ul className="activities">
            {activities.map((activity, idx) => (
              <li
                className="activity"
                key={`${this.cardName}-${idx}`}
                id={`${this.cardName}-${idx}`}
              >
                <input
                  className="activity-done"
                  type="checkbox"
                  value={!activity.done}
                  defaultChecked={activity.done}
                />
                <div className="activity-time"> {activity.time} </div>
                <div className="activity-name"> {activity.name} </div>
                <div className="activity-description">
                  {' '}
                  {activity.description ? `- ${activity.description}` : ''}{' '}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function classNameToKey(name) {
  return name.slice(9);
}

export default DateCard;
