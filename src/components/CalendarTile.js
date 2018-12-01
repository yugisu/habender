import React, { Component } from 'react';
import OptDate from './OptDate';

class CalendarTile extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(props, state) {

    //TODO: DO SOMETHING WITH AUTOUPDATING

    // this.props.currentActivities IS UPDATING ON EMPTY TILES

    console.log('tile', this.props.weekNumber+'_'+this.props.dayNumber, 'updated!');

    console.log(this.props.currentActivities !== props.currentActivities,
      this.props.currentActivities, props.currentActivities,
      this.props.isInCard !== props.isInCard,
      this.props.isToday !== props.isToday);

    return (this.props.currentActivities === props.currentActivities || 
            this.props.isInCard !== props.isInCard ||
            this.props.isToday !== props.isToday)
  }

  handleClick(e) {
    this.props.handleClick(this.props.dateObj);
  }

  render() {
    const date = new OptDate({}, this.props.dateObj)

    return (

      <div 
        className={`calendar-tile`}
        id={this.props.weekNumber + '_' + this.props.dayNumber } 
        onClick={this.handleClick}
      >
        <div className={`tile-header ${(this.props.isToday) ? 'today-tile' : ''} ${(this.props.isInCard) ? 'opened-tile' : ''}`}>
          <span> 
            {date.date}
          </span>
          <span>
          </span>
        </div>
        <ul className="activities">
          {((this.props.currentActivities) ? this.props.currentActivities : [])
            .map((elem, idx) => {
            return (
              <li className={(elem.done) ? 'done' : 'not-done'} key={idx + 1}>
                <div className='activity-time'> {(elem.time) ? elem.time : 'never'} </div>
                <div className='activity-name'> {(elem.name) ? elem.name : 'New act'} </div>
              </li>
            )
          })}

        </ul>
      </div>
    );
  }
}

export default CalendarTile;