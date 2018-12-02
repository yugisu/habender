import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.activity.id);
  }

  handleChange(e) {
    const key = classNameToKey(e.target.className);

    this.props.onActivityInput(
      {
        date: this.props.date,
        id: this.props.activity.id,
        
        key: key,
        value: e.target.value,
      }
    )
  }

  render() {
    const isChecked = checkCreator(this.props.activity.done);

    return (
      <li
        className={`activity ${(this.props.activity.done) ? "done" : ""}`}
        id={`activity${this.props.activity.id}`}
      >
        <input
          className="activity-done"
          type="checkbox"
          value={!isChecked()}
          checked={this.props.activity.done}
          onChange={this.handleChange}
        />
        <input 
          className="activity-time" 
          type="text"
          value={this.props.activity.time} 
          onChange={this.handleChange}
          placeholder="Time"
        />
        <input
          className="activity-name" 
          type="text"
          value={this.props.activity.name} 
          onChange={this.handleChange}
          placeholder="Name your activity"
        />
        <input 
          className="activity-description"
          type="text"
          value={(this.props.activity.description) ? `${this.props.activity.description}` : ''}
          onChange={this.handleChange}
          placeholder="Describe your activity"
        />
        <button 
          className="activity-close"
          onClick={this.handleDelete}
        > x </button>
      </li>
    );
  }
}

function checkCreator(start) {
  let check = !start;
  const gen = (function* () {
    for (;;) {
      check = !check;
      yield (check+'' === 'true') ? true : false;
    }
  })();
  
  return function () { return gen.next().value };
}

function classNameToKey(name) {
  return name.slice(9);
}

export default Activity