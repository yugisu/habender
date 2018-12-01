import React, { Component } from 'react';
import Activity from './Activity';

class DateCard extends Component {
  constructor(props) {
    super(props);

    this.handleNewActivity = this.handleNewActivity.bind(this);
  }

  handleNewActivity(e) {
    this.props.onNewActivity(this.props.dateObj);
  }

  render() {
    return (
      <div className={`date-card ${"Card"+this.props.cardNumber}`}>

        <div className="card-header">
          <button 
            className="new-activity" 
            title="New activity"
            onClick={this.handleNewActivity}
          > + </button>
          <span>{this.props.cardName}</span>
        </div>

        <div className="card-content">
          <ul className="activities">
            {this.props.activities.map((activity, idx) => (
                <Activity
                  key={`${this.cardName}-${idx}`}

                  date={this.props.dateObj.getDateForComparison()}
                  activity={activity}
                  applyChange={this.props.applyChange}
                  handleDelete={this.props.deleteActivity}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DateCard;