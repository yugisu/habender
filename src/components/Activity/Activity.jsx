import React, { Component } from 'react';

//TODO: Make <Activity /> suitable for use with <CalendarTile />

class Activity extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const key = classNameToKey(e.target.className);

    this.props.onActivityInput({
      date: this.props.date,
      id: this.props.activity.id,

      key: key,
      value: e.target.value,
    });
  }

  render() {
    const {
      activity: { done, id, time, name, description },
      onDeleteActivity,
    } = this.props;

    return (
      <li className={`activity ${done ? 'done' : ''}`} id={`activity${id}`}>
        <input
          className="activity-done"
          type="checkbox"
          value={!done}
          checked={done}
          onChange={this.handleChange}
        />
        <input
          className="activity-time"
          type="text"
          value={time}
          onChange={this.handleChange}
          placeholder="Time"
        />
        <input
          className="activity-name"
          type="text"
          value={name}
          onChange={this.handleChange}
          placeholder="Name your activity"
        />
        <input
          className="activity-description"
          type="text"
          value={description ? `${description}` : ''}
          onChange={this.handleChange}
          placeholder="Describe your activity"
        />
        <button className="activity-close" onClick={() => onDeleteActivity(id)}>
          x
        </button>
      </li>
    );
  }
}

function checkCreator(start) {
  let check = !start;
  const gen = (function*() {
    for (;;) {
      check = !check;
      yield check + '' === 'true' ? true : false;
    }
  })();

  return function() {
    return gen.next().value;
  };
}

function classNameToKey(name) {
  return name.slice(9);
}

export default Activity;
